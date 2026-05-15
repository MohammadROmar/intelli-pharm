import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CalendarDays,
  CalendarRange,
  Pencil,
  Trophy,
} from 'lucide-react';

import type { TargetType, Target as TTarget } from '../model/targetTypes';
import { formatPrice, cn, buttonVariants } from '@/shared/lib';
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Button,
  Separator,
} from '@/shared/ui';

type TypeConfig = {
  Icon: React.ElementType;
  accentClass: string;
  badgeClass: string;
};

const TYPE_CONFIG: Record<TargetType, TypeConfig> = {
  monthly: {
    Icon: CalendarDays,
    accentClass: 'border-blue-500/20! [&_.type-icon]:text-blue-500!',
    badgeClass: 'border-blue-500/30! bg-blue-500/10! text-blue-500!',
  },
  quarterly: {
    Icon: CalendarRange,
    accentClass: 'border-purple-500/20! [&_.type-icon]:text-purple-500!',
    badgeClass: 'border-purple-500/30! bg-purple-500/10! text-purple-500!',
  },
};

type Props = {
  target: TTarget;
  setEditingTarget: (target: TTarget | null) => void;
};

export function TargetCard({ target, setEditingTarget }: Props) {
  const { t, i18n } = useTranslation('targets');

  const { Icon, accentClass, badgeClass } = TYPE_CONFIG[target.type];

  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden border transition-shadow hover:shadow-md',
        accentClass,
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
            <Icon className="type-icon size-5" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={cn('text-xs font-normal', badgeClass)}
            >
              {t(`type.${target.type}`)}
            </Badge>
            <Badge
              variant={target.is_active ? 'success' : 'muted'}
              className="text-xs font-normal"
            >
              {target.is_active ? t('active') : t('inactive')}
            </Badge>
          </div>
        </div>

        <div className="mt-3">
          <h3 className="text-foreground text-base leading-tight font-semibold">
            {target.name}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
            {target.description}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="bg-muted/40 rounded-lg px-4 py-3">
          <p className="text-muted-foreground mb-1 text-[11px] font-medium tracking-widest uppercase">
            {t('labelValue')}
          </p>
          <p className="text-foreground text-2xl font-bold tabular-nums">
            {formatPrice(target.value, i18n.language)}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-0 pt-0">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingTarget(target)}
            className="text-muted-foreground group gap-1.5"
          >
            <Pencil className="size-4 transition-transform group-hover:-rotate-12" />
            {t('editButton')}
          </Button>
          <Link
            to={String(target.id)}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'text-muted-foreground group gap-1.5',
            })}
          >
            {t('viewDetails')}
            <div className="rtl:rotate-180">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>

        <Separator />
        <Link
          to={`${target.id}/achievements`}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className:
              'text-muted-foreground hover:text-foreground group w-full justify-center gap-2',
          })}
        >
          <Trophy className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />
          {t('achievementsButton')}
        </Link>
      </CardFooter>
    </Card>
  );
}
