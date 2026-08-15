import { useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CalendarDays, ReceiptText, User } from "lucide-react";

import type { DebtPayment } from "@/entities/debt";
import { formatDate, formatPrice } from "@/shared/lib";
import {
  BadgeLink,
  DetailCard,
  DetailEmptyState,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  SplitDateTime,
} from "@/shared/ui";

type Props = {
  payments: DebtPayment[];
  canViewEmployee: boolean;
};

export function DebtPayments({ payments, canViewEmployee }: Props) {
  const { t, i18n } = useTranslation("debt-detail", {
    keyPrefix: "detail",
  });
  const orderedPayments = useMemo(
    () =>
      [...payments].sort(
        (first, second) =>
          second.payment_date.localeCompare(first.payment_date) ||
          second.created_at.localeCompare(first.created_at),
      ),
    [payments],
  );

  return (
    <DetailCard
      title={t("sections.payments")}
      subtitle={t("sections.paymentsSubtitle")}
      icon={ReceiptText}
      itemsCount={payments.length}
    >
      {orderedPayments.length === 0 ? (
        <DetailEmptyState label={t("payments.empty")} icon={ReceiptText} />
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {orderedPayments.map((payment) => (
              <PaymentMobileCard
                key={payment.id}
                payment={payment}
                language={i18n.language}
                canViewEmployee={canViewEmployee}
              />
            ))}
          </div>

          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("payments.record")}</TableHead>
                  <TableHead>{t("payments.paymentDate")}</TableHead>
                  <TableHead>{t("payments.collector")}</TableHead>
                  <TableHead>{t("payments.amount")}</TableHead>
                  <TableHead>{t("payments.remaining")}</TableHead>
                  <TableHead>{t("payments.note")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderedPayments.map((payment) => (
                  <PaymentRow
                    key={payment.id}
                    payment={payment}
                    language={i18n.language}
                    canViewEmployee={canViewEmployee}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </DetailCard>
  );
}

type PaymentItemProps = {
  payment: DebtPayment;
  language: string;
  canViewEmployee: boolean;
};

function PaymentRow({ payment, language, canViewEmployee }: PaymentItemProps) {
  const { t } = useTranslation("debt-detail", {
    keyPrefix: "detail.payments",
  });

  return (
    <TableRow>
      <TableCell>
        <p className="font-medium tabular-nums">{getPaymentCode(payment.id)}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {t("recordedAt")}
        </p>
        <SplitDateTime date={payment.created_at} icon={CalendarDays} />
      </TableCell>
      <TableCell className="tabular-nums">
        {formatDate(payment.payment_date, language)}
      </TableCell>
      <TableCell>
        <BadgeLink
          to={
            canViewEmployee
              ? `/dashboard/employees/${payment.collected_by}`
              : undefined
          }
          label={payment.collected_by_name}
          icon={User}
        />
      </TableCell>
      <TableCell className="font-semibold tabular-nums">
        {formatPrice(String(payment.amount), language)}
      </TableCell>
      <TableCell className="tabular-nums text-muted-foreground">
        {formatPrice(String(payment.remaining_debt_snapshot), language)}
      </TableCell>
      <TableCell className="max-w-52 text-sm text-muted-foreground">
        <span className="line-clamp-2">{payment.note || t("noNote")}</span>
      </TableCell>
    </TableRow>
  );
}

function PaymentMobileCard({
  payment,
  language,
  canViewEmployee,
}: PaymentItemProps) {
  const { t } = useTranslation("debt-detail", {
    keyPrefix: "detail.payments",
  });

  return (
    <article className="[contain-intrinsic-size:196px] [content-visibility:auto] rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold tabular-nums">
            {getPaymentCode(payment.id)}
          </p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {formatDate(payment.payment_date, language)}
          </p>
        </div>
        <p className="text-end font-bold tabular-nums text-primary">
          {formatPrice(String(payment.amount), language)}
        </p>
      </div>

      <div className="my-4 grid grid-cols-2 gap-3 border-y py-3">
        <PaymentMetric label={t("collector")}>
          <BadgeLink
            to={
              canViewEmployee
                ? `/dashboard/employees/${payment.collected_by}`
                : undefined
            }
            label={payment.collected_by_name}
            icon={User}
          />
        </PaymentMetric>
        <PaymentMetric label={t("remaining")} alignEnd>
          <span className="font-semibold tabular-nums">
            {formatPrice(String(payment.remaining_debt_snapshot), language)}
          </span>
        </PaymentMetric>
      </div>

      <div className="text-sm">
        <p className="text-xs font-medium text-muted-foreground">{t("note")}</p>
        <p className="mt-1 leading-relaxed">{payment.note || t("noNote")}</p>
      </div>
    </article>
  );
}

function PaymentMetric({
  label,
  children,
  alignEnd = false,
}: {
  label: string;
  children: ReactNode;
  alignEnd?: boolean;
}) {
  return (
    <div className={alignEnd ? "min-w-0 text-end" : "min-w-0"}>
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <div className="min-w-0 text-sm">{children}</div>
    </div>
  );
}

function getPaymentCode(id: number) {
  return `PAY-${String(id).padStart(6, "0")}`;
}
