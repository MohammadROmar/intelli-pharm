type RootErrorFallbackProps = { reset: () => void };

const LOCALE_KEY = 'i18nextLng';

function isArabic(): boolean {
  try {
    const lng = localStorage.getItem(LOCALE_KEY) ?? '';
    return lng.startsWith('ar');
  } catch {
    return false;
  }
}

const STRINGS = {
  en: {
    title: 'Application Error',
    message:
      'Something went seriously wrong. The application could not recover automatically.',
    tryAgain: 'Try again',
    reload: 'Reload page',
  },
  ar: {
    title: 'خطأ في التطبيق',
    message: 'حدث خطأ جسيم. لم يتمكن التطبيق من الاسترداد تلقائياً.',
    tryAgain: 'حاول مجدداً',
    reload: 'إعادة تحميل الصفحة',
  },
} as const;

export function RootErrorFallback({ reset }: RootErrorFallbackProps) {
  const ar = isArabic();
  const s = ar ? STRINGS.ar : STRINGS.en;
  const dir = ar ? 'rtl' : 'ltr';

  return (
    <div
      dir={dir}
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#090b0f',
        color: '#f4f4f4',
        fontFamily: 'Cairo, system-ui, -apple-system, sans-serif',
        padding: '2rem',
        textAlign: 'center',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: '5rem',
          height: '5rem',
          borderRadius: '1.25rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.25rem',
        }}
      >
        <WarningIcon />
      </div>

      <div style={{ maxWidth: '420px' }}>
        <h1
          style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            margin: '0 0 0.5rem',
          }}
        >
          {s.title}
        </h1>
        <p
          style={{
            color: '#a6a8b1',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {s.message}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={reset}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid #3b3e4a',
            background: '#282a32',
            color: '#f4f4f4',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
          }}
        >
          {s.tryAgain}
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#068e9e',
            color: '#fafafa',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'inherit',
          }}
        >
          {s.reload}
        </button>
      </div>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
