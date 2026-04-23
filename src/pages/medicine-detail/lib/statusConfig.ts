export const STATUS_CONFIG = {
  expired: {
    variant: 'destructive',
    dateClassName: 'text-destructive font-medium',
    translationKey: 'stockExpired',
  },
  expiring: {
    variant: 'warning',
    dateClassName: 'text-badge-warning-text font-medium',
    translationKey: 'stockExpiringSoon',
  },
  ok: {
    variant: 'success',
    dateClassName: 'text-muted-foreground',
    translationKey: 'stockOk',
  },
} as const;
