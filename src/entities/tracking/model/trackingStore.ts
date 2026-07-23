import { acquireEcho, releaseEcho } from '@/shared/socket';
import { ApiError } from '@/shared/api';

import { fetchTrackingInit } from '../api/trackingApi';
import { STALE_CUTOFF_SECONDS } from '../lib/staleness';
import type { LocationEvent, TrackingFilter } from './types';

const FLUSH_INTERVAL_MS = 700;

const SWEEP_INTERVAL_MS = 10_000;

const TEARDOWN_DELAY_MS = 250;

const MAX_RETRY_ATTEMPTS = 5;
const RETRY_BASE_DELAY_MS = 1000;
const RETRY_MAX_DELAY_MS = 30_000;

const CHANNEL_NAME = 'w1.tracking';
const LOCATION_EVENT_NAME = '.loc';

type Listener = () => void;

type EchoChannelLike = {
  listen(
    event: string,
    callback: (payload: LocationEvent) => void,
  ): EchoChannelLike;
  stopListening(
    event: string,
    callback?: (payload: LocationEvent) => void,
  ): EchoChannelLike;
  subscribed(callback: () => void): EchoChannelLike;
  error(callback: (error: unknown) => void): EchoChannelLike;
};

type EchoLike = {
  private(name: string): EchoChannelLike;
  leave(name: string): void;
};

const positions = new Map<number, LocationEvent>();
const previousPositions = new Map<number, LocationEvent>();
const pendingBuffer = new Map<number, LocationEvent>();

const allListeners = new Set<Listener>();
const userListeners = new Map<number, Set<Listener>>();
const tickListeners = new Set<Listener>();
const errorListeners = new Set<Listener>();

let flushTimer: ReturnType<typeof setTimeout> | null = null;
let sweepTimer: ReturnType<typeof setInterval> | null = null;
let pendingTeardownTimer: ReturnType<typeof setTimeout> | null = null;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let tick = 0;

let refCount = 0;
let connectionGeneration = 0;
let permissionDenied = false;
let subscriptionFailed = false;
let retryAttempt = 0;
let hydrated = false;

let channel: EchoChannelLike | null = null;
let boundHandler: ((payload: LocationEvent) => void) | null = null;

let echoRef: EchoLike | null = null;

const idsCacheBySignature = new Map<string, number[]>();

function notifyAll(): void {
  allListeners.forEach((listener) => listener());
}

function notifyUser(userId: number): void {
  userListeners.get(userId)?.forEach((listener) => listener());
}

function notifyTick(): void {
  tick += 1;
  tickListeners.forEach((listener) => listener());
}

function notifyError(): void {
  errorListeners.forEach((listener) => listener());
}

function ingest(event: LocationEvent): void {
  pendingBuffer.set(event.u, event);
  scheduleFlush();
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(flush, FLUSH_INTERVAL_MS);
}

function flush(): void {
  flushTimer = null;
  let anyChanged = false;

  for (const [userId, incoming] of pendingBuffer) {
    if (applyEvent(incoming)) {
      anyChanged = true;
      notifyUser(userId);
    }
  }

  pendingBuffer.clear();
  if (anyChanged) {
    notifyAll();
  }
}

function applyEvent(event: LocationEvent): boolean {
  const existing = positions.get(event.u);
  if (existing && existing.ts >= event.ts) return false;

  if (existing) previousPositions.set(event.u, existing);
  positions.set(event.u, event);
  return true;
}

function sweep(): void {
  const cutoff = Date.now() / 1000 - STALE_CUTOFF_SECONDS;
  let anyRemoved = false;

  for (const [userId, position] of positions) {
    if (position.ts < cutoff) {
      positions.delete(userId);
      previousPositions.delete(userId);
      anyRemoved = true;
      notifyUser(userId);
    }
  }

  if (anyRemoved) {
    notifyAll();
  }

  notifyTick();
}

async function connect(generation: number): Promise<void> {
  try {
    const initial = await fetchTrackingInit();
    if (generation !== connectionGeneration) return;

    for (const event of initial) applyEvent(event);
    hydrated = true;
    notifyAll();
  } catch (error) {
    if (generation !== connectionGeneration) return;

    if (error instanceof ApiError && error.status === 403) {
      permissionDenied = true;
      notifyError();
      return;
    }
  }

  if (generation !== connectionGeneration) return;

  retryAttempt = 0;
  subscriptionFailed = false;
  openChannel(generation);
}

function openChannel(generation: number): void {
  leaveChannelForRetry();

  if (!echoRef) {
    echoRef = acquireEcho() as unknown as EchoLike;
  }

  channel = echoRef.private(CHANNEL_NAME);
  boundHandler = (payload) => ingest(payload);
  channel.listen(LOCATION_EVENT_NAME, boundHandler);

  channel.subscribed(() => {
    if (generation !== connectionGeneration) return;
    retryAttempt = 0;
    subscriptionFailed = false;
    notifyError();
  });

  channel.error((error) => {
    if (generation !== connectionGeneration) return;
    if (import.meta.env.DEV) {
      console.error('[tracking] channel subscription error', error);
    }
    scheduleRetry(generation);
  });

  if (!sweepTimer) sweepTimer = setInterval(sweep, SWEEP_INTERVAL_MS);
}

function scheduleRetry(generation: number): void {
  if (retryAttempt >= MAX_RETRY_ATTEMPTS) {
    subscriptionFailed = true;
    notifyError();
    return;
  }

  const delay = Math.min(
    RETRY_BASE_DELAY_MS * 2 ** retryAttempt,
    RETRY_MAX_DELAY_MS,
  );
  retryAttempt += 1;
  notifyError();

  retryTimer = setTimeout(() => {
    retryTimer = null;
    if (generation !== connectionGeneration) return;
    openChannel(generation);
  }, delay);
}

function forgetLocalChannel(): void {
  if (channel && boundHandler) {
    channel.stopListening(LOCATION_EVENT_NAME, boundHandler);
  }
  channel = null;
  boundHandler = null;
}

function leaveChannelForRetry(): void {
  forgetLocalChannel();
  try {
    echoRef?.leave(CHANNEL_NAME);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[tracking] error leaving channel', error);
    }
  }
}

function disconnect(): void {
  connectionGeneration += 1;

  forgetLocalChannel();

  if (echoRef) {
    releaseEcho();
    echoRef = null;
  }

  if (sweepTimer) clearInterval(sweepTimer);
  sweepTimer = null;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = null;
  if (retryTimer) clearTimeout(retryTimer);
  retryTimer = null;

  positions.clear();
  previousPositions.clear();
  pendingBuffer.clear();
  idsCacheBySignature.clear();
  hydrated = false;
  permissionDenied = false;
  subscriptionFailed = false;
  retryAttempt = 0;
}

export function acquireTracking(): () => void {
  refCount += 1;

  if (pendingTeardownTimer) {
    clearTimeout(pendingTeardownTimer);
    pendingTeardownTimer = null;
  } else if (refCount === 1) {
    void connect(connectionGeneration);
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    refCount = Math.max(0, refCount - 1);

    if (refCount === 0) {
      pendingTeardownTimer = setTimeout(() => {
        pendingTeardownTimer = null;
        disconnect();
      }, TEARDOWN_DELAY_MS);
    }
  };
}

export function retryTrackingConnection(): void {
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
  retryAttempt = 0;
  subscriptionFailed = false;
  notifyError();
  openChannel(connectionGeneration);
}

export function subscribeAll(listener: Listener): () => void {
  allListeners.add(listener);
  return () => allListeners.delete(listener);
}

export function subscribeUser(userId: number, listener: Listener): () => void {
  let listenersForUser = userListeners.get(userId);
  if (!listenersForUser) {
    listenersForUser = new Set();
    userListeners.set(userId, listenersForUser);
  }
  listenersForUser.add(listener);

  return () => {
    listenersForUser.delete(listener);
    if (listenersForUser.size === 0) userListeners.delete(userId);
  };
}

export function subscribeTick(listener: Listener): () => void {
  tickListeners.add(listener);
  return () => tickListeners.delete(listener);
}

export function subscribeError(listener: Listener): () => void {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
}

export function getPosition(userId: number): LocationEvent | undefined {
  return positions.get(userId);
}

export function getPreviousPosition(userId: number): LocationEvent | undefined {
  return previousPositions.get(userId);
}

export function getTick(): number {
  return tick;
}

export function getIsPermissionDenied(): boolean {
  return permissionDenied;
}

export function getIsSubscriptionFailed(): boolean {
  return subscriptionFailed;
}

export function getRetryAttempt(): number {
  return retryAttempt;
}

export function getIsHydrated(): boolean {
  return hydrated;
}

export function getFilteredIds(filter: TrackingFilter): number[] {
  const { regionId, role } = filter;
  const signature = `${regionId}|${role}`;

  const matchingIds: number[] = [];
  for (const position of positions.values()) {
    if (regionId !== 'all' && position.rid !== regionId) continue;
    if (role !== 'all' && position.r !== role) continue;
    matchingIds.push(position.u);
  }
  matchingIds.sort((a, b) => a - b);

  const cached = idsCacheBySignature.get(signature);
  if (cached) {
    const unchanged =
      cached.length === matchingIds.length &&
      cached.every((id, index) => id === matchingIds[index]);
    if (unchanged) return cached;
  }

  idsCacheBySignature.set(signature, matchingIds);
  return matchingIds;
}
