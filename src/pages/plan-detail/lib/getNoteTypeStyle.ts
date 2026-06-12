import { AlertTriangle, FileText, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NoteType = 'general' | 'tip' | 'warning';

export const NOTE_TYPE_STYLES: Record<
  NoteType,
  {
    icon: LucideIcon;
    accent: string;
    box: string;
  }
> = {
  general: {
    icon: FileText,
    accent: 'text-muted-foreground',
    box: 'bg-muted/60 border-border text-muted-foreground',
  },
  tip: {
    icon: Lightbulb,
    accent: 'text-blue-600 dark:text-blue-400',
    box: 'bg-blue-500/5 border-blue-500/10 text-blue-700/90 dark:text-blue-200/90',
  },
  warning: {
    icon: AlertTriangle,
    accent: 'text-amber-600 dark:text-amber-400',
    box: 'bg-amber-500/5 border-amber-500/10 text-amber-700/90 dark:text-amber-200/90',
  },
};

export function getNoteTypeStyle(type: string) {
  return NOTE_TYPE_STYLES[type as NoteType] ?? NOTE_TYPE_STYLES.general;
}
