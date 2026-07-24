import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';

import { useTheme } from '../../config';

export function Toaster() {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      icons={{
        success: <CircleCheckIcon className="text-success size-5" />,
        info: <InfoIcon className="size-5 text-cyan-500" />,
        warning: <TriangleAlertIcon className="text-warning size-5" />,
        error: <OctagonXIcon className="text-destructive size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      position="top-center"
      toastOptions={{
        descriptionClassName: 'text-muted-foreground!',
        classNames: {
          actionButton:
            'bg-primary! text-primary-foreground! hover:bg-primary/90! font-medium! transition-colors!',
        },
      }}
      className="toaster group font-cairo!"
    />
  );
}
