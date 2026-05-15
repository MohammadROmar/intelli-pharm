import { useTranslation } from 'react-i18next';
import { Clock, Mail, Phone, Shield, Truck, User } from 'lucide-react';

import type { Employee } from '@/entities/employee';
import { Badge, DetailCard, DetailCell, Separator } from '@/shared/ui';
import { formatTime } from '@/shared/lib';

type Props = { employee: Employee };

export function EmployeeInfoCard({ employee }: Props) {
  const { t, i18n } = useTranslation('employees');

  const role = employee.roles[0] ?? '—';

  return (
    <DetailCard
      title={t('detail.infoCardTitle')}
      subtitle={t('detail.infoCardSubtitle')}
      icon={User}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('detail.labelId')}>
          <span className="font-mono">
            EMP-{String(employee.id).padStart(6, '0')}
          </span>
        </DetailCell>
        <DetailCell label={t('detail.labelStatus')}>
          <Badge variant={employee.is_active ? 'success' : 'muted'}>
            {employee.is_active ? t('detail.active') : t('detail.inactive')}
          </Badge>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('detail.labelName')}>
          <span className="flex items-center gap-1.5">
            <User className="text-muted-foreground size-4 shrink-0" />
            {employee.name}
          </span>
        </DetailCell>
        <DetailCell label={t('detail.labelRole')}>
          <span className="flex items-center gap-1.5">
            <Shield className="text-muted-foreground size-4 shrink-0" />
            <span className="capitalize">
              {t(`roles.${role}`, { defaultValue: role })}
            </span>
          </span>
        </DetailCell>
      </div>

      <Separator />

      {employee.vehicle_capacity && (
        <>
          <DetailCell label={t('detail.labelVehicleCapacity')}>
            <span className="flex items-center gap-1.5">
              <Truck className="text-muted-foreground size-4 shrink-0" />
              {employee.vehicle_capacity}
            </span>
          </DetailCell>
          <Separator />
        </>
      )}

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('detail.labelEmail')}>
          <span className="flex items-center gap-1.5">
            <Mail className="text-muted-foreground size-4 shrink-0" />
            <span className="truncate font-mono text-sm">{employee.email}</span>
          </span>
        </DetailCell>
        <DetailCell label={t('detail.labelPhone')}>
          {employee.phone_number ? (
            <span className="flex items-center gap-1.5">
              <Phone className="text-muted-foreground size-4 shrink-0" />
              {employee.phone_number}
            </span>
          ) : (
            <span className="text-muted-foreground font-normal">—</span>
          )}
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('detail.labelWorkingStart')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-4 shrink-0" />
            {formatTime(employee.working_start, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('detail.labelWorkingEnd')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-4 shrink-0" />
            {formatTime(employee.working_end, i18n.language)}
          </span>
        </DetailCell>
      </div>
    </DetailCard>
  );
}
