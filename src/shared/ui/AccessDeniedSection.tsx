import { ShieldOff } from 'lucide-react';

type Props = { badge: string; title: string; subtitle: string };

export function AccessDeniedSection({ badge, title, subtitle }: Props) {
  return (
    <section className="grid h-full place-items-center">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div className="animate-in fade-in zoom-in-95 fill-mode-[both] mb-5 flex size-16 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-500 duration-500 motion-reduce:animate-none">
          <ShieldOff className="size-7" aria-hidden />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] mb-6 inline-flex items-center rounded-full bg-purple-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest text-purple-500 uppercase duration-500 [animation-delay:75ms] motion-reduce:animate-none">
          {badge}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] space-y-3 duration-700 [animation-delay:125ms] motion-reduce:animate-none">
          <h2 className="text-foreground text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
