import LoginForm from '@/shared/components/LoginForm';
import BackgroundPattern from '@/shared/components/BackgroundPattern';
import Logo from '@/shared/components/Logo';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <BackgroundPattern />

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
            <Logo className="size-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">IntelliPharm</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
