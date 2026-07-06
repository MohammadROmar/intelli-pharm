import { useLayoutEffect, useState } from 'react';

export function useIsClamped(
  ref: React.RefObject<HTMLElement | null>,
  skip: boolean,
) {
  const [isClamped, setIsClamped] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || skip) return;

    const check = () => {
      if (!el.clientHeight) return;

      setIsClamped(el.scrollHeight > el.clientHeight + 1);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, skip]);

  return isClamped;
}
