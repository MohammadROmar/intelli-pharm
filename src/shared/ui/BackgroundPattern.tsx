import { memo } from 'react';

export const BackgroundPattern = memo(function BackgroundPattern() {
  return (
    <div
      className="absolute inset-0 -z-10 opacity-25"
      style={{
        backgroundImage: `
        linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
      `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 0',
        maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
        WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  );
});
