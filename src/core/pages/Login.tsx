import LoginForm from '@/shared/components/LoginForm';
import BackgroundPattern from '@/shared/components/BackgroundPattern';
import Logo from '@/shared/components/Logo';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <BackgroundPattern />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium rtl:flex-row-reverse">
          <Logo withColors className="size-4" />
          <h1 id="login-title">IntelliPharm</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
