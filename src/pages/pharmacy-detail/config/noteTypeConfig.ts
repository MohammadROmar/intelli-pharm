import type { NoteType } from '@/entities/pharmacy';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';

export type NoteTypeConfig = {
  icon: React.ElementType;
  labelKey: string;
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
