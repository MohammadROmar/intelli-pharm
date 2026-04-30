import type { PropsWithChildren } from 'react';
import { Gift, Plus } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  CardSectionHeader,
} from '@/shared/ui';

type Props = PropsWithChildren<
  {
    title: string;
    description: string;
  } & (
    | { hasTrigger: true; triggerLabel: string }
    | { hasTrigger?: false; open: boolean; setOpen: (open: boolean) => void }
  )
>;

export function GiftModal(props: Props) {
  return (
    <Dialog
      open={props.hasTrigger ? undefined : props.open}
      onOpenChange={props.hasTrigger ? undefined : props.setOpen}
    >
      {props.hasTrigger && (
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4 shrink-0" />
            {props.triggerLabel}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div aria-hidden>
            <CardSectionHeader {...props} icon={Gift} />
          </div>
          <DialogTitle className="sr-only">{props.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {props.description}
          </DialogDescription>
        </DialogHeader>

        {props.children}
      </DialogContent>
    </Dialog>
  );
}
