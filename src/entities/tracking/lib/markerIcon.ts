import L from 'leaflet';

import type { EmployeeRole, StalenessLevel } from '../model/types';
import { getStalenessOpacity } from './staleness';

const ROLE_GLYPH: Record<EmployeeRole, string> = {
  rep: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="white"/>
    <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="white"/>
  </svg>`,
  delivery: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="12" height="9" rx="1" fill="white"/>
    <path d="M14 10h4.2l3.3 3.3V16H14z" fill="white"/>
    <circle cx="7" cy="18" r="1.7" fill="white"/>
    <circle cx="17.5" cy="18" r="1.7" fill="white"/>
  </svg>`,
};

const ROLE_ACCENT: Record<EmployeeRole, string> = {
  rep: '#2563eb',
  delivery: '#f97316',
};

const TASK_BADGE_COLOR = '#16a34a';

const MARKER_SIZE = 36;
const BADGE_SIZE = 13;

export type MarkerIconKey = {
  role: EmployeeRole;
  headingBucket: number | null;
  staleness: StalenessLevel;
  hasTask: boolean;
};

const iconCache = new Map<string, L.DivIcon>();

function cacheKey({
  role,
  headingBucket,
  staleness,
  hasTask,
}: MarkerIconKey): string {
  return `${role}-${headingBucket ?? 'none'}-${staleness}-${hasTask ? 1 : 0}`;
}

export function getLiveMarkerIcon(key: MarkerIconKey): L.DivIcon {
  const id = cacheKey(key);
  const cached = iconCache.get(id);
  if (cached) return cached;

  const icon = L.divIcon({
    className: '',
    html: buildMarkerHtml(key),
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
    popupAnchor: [0, -MARKER_SIZE / 2 - 6],
  });

  iconCache.set(id, icon);
  return icon;
}

function buildMarkerHtml({
  role,
  headingBucket,
  staleness,
  hasTask,
}: MarkerIconKey): string {
  const opacity = getStalenessOpacity(staleness);
  const accent = ROLE_ACCENT[role];
  const glyph = ROLE_GLYPH[role];

  const vehicleRotation =
    role === 'delivery' && headingBucket != null
      ? `transform:rotate(${headingBucket}deg);`
      : '';

  const headingIndicator =
    role === 'rep' && headingBucket != null
      ? buildHeadingIndicatorHtml(headingBucket, accent)
      : '';

  const taskBadge = hasTask ? buildTaskBadgeHtml() : '';

  return `
    <div style="position:relative;width:${MARKER_SIZE}px;height:${MARKER_SIZE}px;opacity:${opacity};transition:opacity .4s ease;">
      <div style="width:100%;height:100%;border-radius:50%;background:${accent};border:2.5px solid #ffffff;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;">
        <span style="display:flex;${vehicleRotation}">${glyph}</span>
      </div>
      ${headingIndicator}
      ${taskBadge}
    </div>
  `;
}

function buildHeadingIndicatorHtml(
  headingBucket: number,
  accent: string,
): string {
  return `
    <div style="position:absolute;top:50%;left:50%;width:0;height:0;
      border-left:5px solid transparent;border-right:5px solid transparent;
      border-bottom:8px solid ${accent};
      transform:translate(-50%,-50%) rotate(${headingBucket}deg) translateY(-${MARKER_SIZE / 2 + 5}px);"></div>
  `;
}

function buildTaskBadgeHtml(): string {
  return `
    <div style="position:absolute;bottom:-1px;right:-1px;width:${BADGE_SIZE}px;height:${BADGE_SIZE}px;
      border-radius:50%;background:${TASK_BADGE_COLOR};border:2px solid #ffffff;
      box-shadow:0 1px 3px rgba(0,0,0,.4);"></div>
  `;
}
