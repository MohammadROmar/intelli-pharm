import { useAppSelector } from '@/shared/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';

export function UserInfo() {
  const user = useAppSelector((state) => state.session.user);

  if (!user) return null;

  return (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarImage alt={user.name} />
        <AvatarFallback className="rounded-lg uppercase">
          {user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-start text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}
