import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FOCUS_PARAM = 'focus';

const FOCUS_ID_PATTERN = /^\d+$/;

type FocusUpdater = number | null | ((current: number | null) => number | null);

type UseTrackingFocusResult = {
  focusedUserId: number | null;
  setFocusedUserId: (updater: FocusUpdater) => void;
  clearFocus: () => void;
};

function parseFocusedUserId(raw: string | null): number | null {
  const isValid = raw !== null && FOCUS_ID_PATTERN.test(raw.trim());
  return isValid ? Number(raw) : null;
}

export function useTrackingFocus(): UseTrackingFocusResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const focusedUserId = useMemo(
    () => parseFocusedUserId(searchParams.get(FOCUS_PARAM)),
    [searchParams],
  );

  const setFocusedUserId = useCallback(
    (updater: FocusUpdater) => {
      setSearchParams(
        (previous) => {
          const current = parseFocusedUserId(previous.get(FOCUS_PARAM));
          const next =
            typeof updater === 'function' ? updater(current) : updater;

          const nextParams = new URLSearchParams(previous);
          if (next === null) nextParams.delete(FOCUS_PARAM);
          else nextParams.set(FOCUS_PARAM, String(next));
          return nextParams;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearFocus = useCallback(
    () => setFocusedUserId(null),
    [setFocusedUserId],
  );

  useEffect(() => {
    if (focusedUserId === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;
      clearFocus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedUserId, clearFocus]);

  return { focusedUserId, setFocusedUserId, clearFocus };
}
