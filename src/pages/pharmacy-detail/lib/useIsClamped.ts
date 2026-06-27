import { useEffect, useState } from 'react';

export function useIsClamped(
  ref: React.RefObject<HTMLParagraphElement | null>,
  skip: boolean,
) {
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
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
