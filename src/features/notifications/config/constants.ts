import { BellOff, BellRing, CircleAlert, Info } from 'lucide-react';

import type { ActivationStatus, StatusPreset } from '../model/types';

export const DENIED_STEP_COUNT = 4;

export const STATUS_PRESETS: Record<ActivationStatus, StatusPreset> = {
  'permission-default': {
    icon: BellRing,
    containerClassName: 'border-primary/25 bg-primary/5',
    iconWrapperClassName: 'bg-primary/10',
    iconClassName: 'text-primary',
    titleKey: 'default.title',
    descriptionKey: 'default.description',
    actionKey: 'default.action',
  },
  'permission-denied': {
    icon: BellOff,
    containerClassName: 'border-destructive/25 bg-destructive/5',
    iconWrapperClassName: 'bg-destructive/10',
    iconClassName: 'text-destructive',
    titleKey: 'denied.title',
    descriptionKey: 'denied.description',
    actionKey: 'denied.action',
  },
  unsupported: {
    icon: Info,
    containerClassName: 'border-border bg-muted/40',
    iconWrapperClassName: 'bg-muted',
    iconClassName: 'text-muted-foreground',
    titleKey: 'unsupported.title',
    descriptionKey: 'unsupported.description',
    actionKey: '',
  },
  'device-unregistered': {
    icon: CircleAlert,
    containerClassName: 'border-primary/25 bg-primary/5',
    iconWrapperClassName: 'bg-primary/10',
    iconClassName: 'text-primary',
    titleKey: 'unregistered.title',
    descriptionKey: 'unregistered.description',
    actionKey: 'unregistered.action',
  },
  'device-error': {
    icon: CircleAlert,
    containerClassName: 'border-destructive/25 bg-destructive/5',
    iconWrapperClassName: 'bg-destructive/10',
    iconClassName: 'text-destructive',
    titleKey: 'error.title',
    descriptionKey: 'error.description',
    actionKey: 'error.action',
  },
};
