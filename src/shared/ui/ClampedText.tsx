import { memo, useCallback, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn, useIsClamped } from '../lib';

type Props = {
  children: React.ReactNode;
  className?: string;
  expandLabel: string;
  collapseLabel: string;
};

export const ClampedText = memo(function ClampedText({
  children,
  className,
  expandLabel,
  collapseLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const isClamped = useIsClamped(ref, expanded);

  const handleToggle = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      setExpanded((prev) => !prev);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle(e);
      }
    },
    [handleToggle],
  );

  return (
    <>
      <div className={cn('w-full', className)}>
        <div
          ref={ref}
          className={
            !expanded
              ? 'line-clamp-2 cursor-pointer overflow-hidden'
              : 'cursor-default'
          }
          onClick={!expanded ? handleToggle : undefined}
        >
          {children}
        </div>
      </div>

      {isClamped && (
        <span
          role="button"
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="text-muted-foreground hover:text-foreground mt-1 inline-flex h-auto w-min cursor-pointer items-center gap-1 py-0.5 text-xs whitespace-nowrap"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-3" />
              {collapseLabel}
            </>
          ) : (
            <>
              <ChevronDown className="size-3" />
              {expandLabel}
            </>
          )}
        </span>
      )}
    </>
  );
});
