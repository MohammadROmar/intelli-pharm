import { AlertTriangle, Info, Lightbulb, type LucideIcon } from 'lucide-react';

import type { NoteType } from '@/entities/pharmacy';

type NoteTypeConfig = {
  icon: LucideIcon;
  labelKey:
    | 'noteTypeGeneral'
    | 'noteTypeTip'
    | 'noteTypeWarning'
    | 'noteTypeUnknown';
  iconClassName: string;
  badgeClassName: string;
};

export const NOTE_TYPE_CONFIG = {
  general: {
    icon: Info,
    labelKey: 'noteTypeGeneral',
    iconClassName: 'bg-muted text-muted-foreground',
    badgeClassName: 'bg-muted text-muted-foreground',
  },
  tip: {
    icon: Lightbulb,
    labelKey: 'noteTypeTip',
    iconClassName: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    badgeClassName: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    icon: AlertTriangle,
    labelKey: 'noteTypeWarning',
    iconClassName: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    badgeClassName: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  },
} satisfies Record<NoteType, NoteTypeConfig>;

const UNKNOWN_NOTE_TYPE_CONFIG = {
  icon: Info,
  labelKey: 'noteTypeUnknown',
  iconClassName: 'bg-muted text-muted-foreground',
  badgeClassName: 'bg-muted text-muted-foreground',
} satisfies NoteTypeConfig;

export function getNoteTypeConfig(noteType: unknown): NoteTypeConfig {
  if (
    typeof noteType === 'string' &&
    Object.prototype.hasOwnProperty.call(NOTE_TYPE_CONFIG, noteType)
  ) {
    return NOTE_TYPE_CONFIG[noteType as NoteType];
  }

  return UNKNOWN_NOTE_TYPE_CONFIG;
}
