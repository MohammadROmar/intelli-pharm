import { unwrapApiResponse } from '@/shared/api';
import { acquireEcho, releaseEcho } from '@/shared/socket';

import { getPlanGenerationRequest } from './planApi';
import {
  PlanGenerationFailedError,
  PlanGenerationTimeoutError,
} from '../model/errors';
import type {
  PlanDetail,
  PlanFailedEventPayload,
  PlanGenerationRequest,
  PlanGenerationStatus,
  PlanReadyEventPayload,
} from '../model/types';

const POLL_INTERVAL_MS = 5000;

const GENERATION_TIMEOUT_MS = 6 * 60 * 1000;

type AwaitPlanGenerationOptions = {
  onStatusChange?: (status: PlanGenerationStatus) => void;
};

type GenerationTimers = {
  poll?: ReturnType<typeof setInterval>;
  timeout?: ReturnType<typeof setTimeout>;
};

function stripPrivatePrefix(channelName: string): string {
  return channelName.replace(/^private-/, '');
}

function toEchoEventName(eventName: string): string {
  return eventName.startsWith('.') ? eventName : `.${eventName}`;
}

export function awaitPlanGeneration(
  request: PlanGenerationRequest,
  { onStatusChange }: AwaitPlanGenerationOptions = {},
): Promise<PlanDetail> {
  return new Promise<PlanDetail>((resolve, reject) => {
    let settled = false;
    const timers: GenerationTimers = {};

    const echo = acquireEcho();
    const channel = echo.private(stripPrivatePrefix(request.channel));
    const readyEvent = toEchoEventName(request.ready_event);
    const failedEvent = toEchoEventName(request.failed_event);

    function settle(action: () => void): void {
      if (settled) return;
      settled = true;
      clearInterval(timers.poll);
      clearTimeout(timers.timeout);
      channel.stopListening(readyEvent, handleReady);
      channel.stopListening(failedEvent, handleFailed);
      releaseEcho();
      action();
    }

    function handleReady(payload: PlanReadyEventPayload): void {
      if (payload.request_id !== request.request_id) return;
      settle(() => resolve(payload.plan));
    }

    function handleFailed(payload: PlanFailedEventPayload): void {
      if (payload.request_id !== request.request_id) return;
      settle(() => reject(new PlanGenerationFailedError(payload.message)));
    }

    channel.listen(readyEvent, handleReady);
    channel.listen(failedEvent, handleFailed);

    timers.poll = setInterval(() => {
      getPlanGenerationRequest(request.request_id)
        .then((response) => {
          const latest = unwrapApiResponse(response);
          onStatusChange?.(latest.status);

          if (latest.status === 'completed' && latest.plan) {
            settle(() => resolve(latest.plan!));
          } else if (latest.status === 'failed') {
            settle(() =>
              reject(new PlanGenerationFailedError(latest.error_message)),
            );
          }
        })
        .catch(() => {
          // A single failed poll shouldn't end the wait — the socket may
          // still deliver the result, and the next tick will retry.
        });
    }, POLL_INTERVAL_MS);

    timers.timeout = setTimeout(() => {
      settle(() => reject(new PlanGenerationTimeoutError()));
    }, GENERATION_TIMEOUT_MS);
  });
}
