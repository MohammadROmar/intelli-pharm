import type { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';

import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './DropdownMenu';

type ActionsDropdownProps = {
  label: string;
  children: ReactNode;
};

export function ActionsDropdown({ label, children }: ActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-card!">
          <MoreHorizontal />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
