import type { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

type Props = { user: { email: string; name: string }; badge?: ReactNode };

export function UserInfo({ user, badge }: Props) {
  return (
    <>
      <div className="relative size-8 shrink-0">
        <Avatar className="size-8 rounded-lg">
          <AvatarImage alt={user.name} />
          <AvatarFallback className="rounded-lg uppercase">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        {badge}
      </div>
      <div className="grid flex-1 text-start text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}
