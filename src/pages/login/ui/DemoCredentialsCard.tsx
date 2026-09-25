import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Copy, Wand2 } from 'lucide-react';

import { Button, Card, CardContent } from '@/shared/ui';
import { cn } from '@/shared/lib';

const DEMO_EMAIL = 'view@only.com';
const DEMO_PASSWORD = 'password';

type CopyField = 'email' | 'password';

type DemoCredentialsCardProps = {
  className?: string;
  /** Wire this to RHF's setValue in the login form to add a one-click fill. Omit to show copy-only. */
  onAutofill?: (credentials: { email: string; password: string }) => void;
};

export function DemoCredentialsCard({
  className,
  onAutofill,
}: DemoCredentialsCardProps) {
  const { t } = useTranslation('login', { keyPrefix: 'demoCredentials' });
  const [copiedField, setCopiedField] = useState<CopyField | null>(null);

  const handleCopy = useCallback((field: CopyField, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 1500);
    });
  }, []);

  const handleAutofill = useCallback(() => {
    onAutofill?.({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
  }, [onAutofill]);

  return (
    <Card
      className={cn('border-primary/30 bg-primary/5 border-dashed', className)}
    >
      <CardContent>
        <p className="text-muted-foreground mb-3 text-sm">{t('subtitle')}</p>

        <div className="flex flex-col gap-2">
          <CredentialRow
            label={t('emailLabel')}
            value={DEMO_EMAIL}
            copied={copiedField === 'email'}
            onCopy={() => handleCopy('email', DEMO_EMAIL)}
            copyLabel={t('copy')}
            copiedLabel={t('copied')}
          />
          <CredentialRow
            label={t('passwordLabel')}
            value={DEMO_PASSWORD}
            copied={copiedField === 'password'}
            onCopy={() => handleCopy('password', DEMO_PASSWORD)}
            copyLabel={t('copy')}
            copiedLabel={t('copied')}
          />
        </div>

        {onAutofill && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAutofill}
            className="gap-2"
          >
            <Wand2 className="size-4" />
            {t('autofill')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

type CredentialRowProps = {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  copyLabel: string;
  copiedLabel: string;
};

function CredentialRow({
  label,
  value,
  copied,
  onCopy,
  copyLabel,
  copiedLabel,
}: CredentialRowProps) {
  return (
    <div className="bg-background flex items-center justify-between gap-2 rounded-md border px-3 py-2">
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="font-mono text-sm">{value}</span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onCopy}
        aria-label={copied ? copiedLabel : copyLabel}
      >
        {copied ? (
          <Check className="text-primary size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </div>
  );
}
