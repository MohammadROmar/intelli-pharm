import L from 'leaflet';

import { getStalenessOpacity } from './staleness';
import type { EmployeeRole, StalenessLevel } from '../model/types';

const ROLE_GLYPH: Partial<Record<EmployeeRole, string>> = {
  rep: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12h.01"/>
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <path d="M22 13a18.15 18.15 0 0 1-20 0"/>
    <rect width="20" height="14" x="2" y="6" rx="2"/>
  </svg>`,
  distributor: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
    <path d="M15 18H9"/>
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
    <circle cx="17" cy="18" r="2"/> 
    <circle cx="7" cy="18" r="2"/>
  </svg>`,
};

const DEFAULT_ROLE_GLYPH = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
  <circle cx="12" cy="7" r="4"/>
</svg>`;

export const ROLE_ACCENT: Partial<Record<EmployeeRole, string>> = {
  rep: '#0ea5e9',
  distributor: '#7c3aed',
};

export const DEFAULT_ROLE_ACCENT = '#059669';

export const TASK_BADGE_COLOR = '#16a34a';

const MARKER_SIZE = 36;

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
}: MarkerIconKey): string {
  const opacity = getStalenessOpacity(staleness);
  const accent = ROLE_ACCENT[role] ?? DEFAULT_ROLE_ACCENT;
  const glyph = ROLE_GLYPH[role] ?? DEFAULT_ROLE_GLYPH;

  const headingIndicator =
    headingBucket != null
      ? buildHeadingIndicatorHtml(headingBucket, accent)
      : '';

  return `
    <div style="position:relative;width:${MARKER_SIZE}px;height:${MARKER_SIZE}px;opacity:${opacity};transition:opacity .4s ease;">
      <div style="width:100%;height:100%;border-radius:50%;background:${accent};border:2.5px solid #ffffff;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;">
        <span style="display:flex;">${glyph}</span>
      </div>
      ${headingIndicator}
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
