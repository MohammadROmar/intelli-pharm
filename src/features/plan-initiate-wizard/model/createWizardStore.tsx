import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import type { Dispatch, ReactNode } from 'react';

import { useLatestRef } from '@/shared/lib';

import { createWizardDraftStorage } from '../lib/wizardDraft';

type WizardStoreConfig<TState, TAction extends { type: string }> = {
  reducer: (state: TState, action: TAction) => TState;
  initialState: TState;
  draftStorageKey: string;
  draftStorageVersion: number;
  missingProviderMessage: string;
};

type WizardActions<TState, TAction> = {
  dispatch: Dispatch<TAction>;
  reset: () => void;
  /**
   * Reads the current wizard state without subscribing to it. Safe to call
   * from an event handler (submit, navigate) that needs a snapshot at the
   * moment it runs. Reach for `useWizard()`'s reactive `state` instead for
   * anything that renders the value — this is only for the "I need it
   * later, inside a callback" case.
   */
  getState: () => TState;
};

/**
 * Builds the context + hook + provider trio every plan-initiation wizard
 * needs, wired to that wizard's own reducer/initial state and a dedicated,
 * versioned localStorage draft. Each concrete wizard (`plan-initiate`,
 * `plan-initiate-from-deliveries`) still owns its own `WizardState`/
 * `WizardAction`/reducer — those genuinely differ (different fields,
 * different action variants) — but the wiring *around* that reducer
 * (context, the "used outside its provider" guard, draft load/save/clear on
 * mount/change/reset) was previously hand-copied per wizard with nothing
 * but names changed. This is that wiring, written once.
 *
 * State and actions live in two separate contexts. `dispatch`/`reset`/
 * `getState` never change identity across a provider's lifetime, so a
 * component that only calls `useWizardActions()` (not `useWizard()`) never
 * re-renders when wizard state changes — useful for submit handlers, reset
 * buttons, and anything else that acts on the wizard without rendering its
 * value.
 */
export function createWizardStore<TState, TAction extends { type: string }>({
  reducer,
  initialState,
  draftStorageKey,
  draftStorageVersion,
  missingProviderMessage,
}: WizardStoreConfig<TState, TAction>) {
  const { loadDraft, saveDraft, clearDraft } = createWizardDraftStorage<TState>(
    draftStorageKey,
    draftStorageVersion,
  );

  type WizardContextValue = {
    state: TState;
    dispatch: Dispatch<TAction>;
    reset: () => void;
  };

  const WizardStateContext = createContext<TState | null>(null);
  const WizardActionsContext = createContext<WizardActions<
    TState,
    TAction
  > | null>(null);

  function useWizard(): WizardContextValue {
    const state = useContext(WizardStateContext);
    const actions = useContext(WizardActionsContext);
    if (state === null || actions === null) {
      throw new Error(missingProviderMessage);
    }
    return { state, dispatch: actions.dispatch, reset: actions.reset };
  }

  /**
   * Narrower than `useWizard()`: only `dispatch`/`reset`/`getState`, none of
   * which ever change identity. Prefer this over `useWizard()` in anything
   * that dispatches or reads a one-off snapshot but doesn't render `state`
   * — it won't re-render on every wizard state change.
   */
  function useWizardActions(): WizardActions<TState, TAction> {
    const actions = useContext(WizardActionsContext);
    if (!actions) throw new Error(missingProviderMessage);
    return actions;
  }

  function WizardProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
      reducer,
      initialState,
      (initial) => loadDraft() ?? initial,
    );

    useEffect(() => {
      saveDraft(state);
    }, [state]);

    const stateRef = useLatestRef(state);

    const reset = useCallback(() => {
      clearDraft();
      // `RESET` is a variant of every concrete wizard's action union, but
      // TAction here is an unconstrained-beyond-`{type: string}` generic, so
      // TS can't verify that structurally — this cast is the one place that
      // trusts the caller's TAction actually includes it (same kind of
      // single, boundary cast as `action.payload as WizardStep` in each
      // wizard's own reducer).
      dispatch({ type: 'RESET' } as TAction);
    }, []);

    const getState = useCallback(() => stateRef.current, [stateRef]);

    // Memoized so this object's identity survives every re-render of this
    // provider (which happens on every wizard state change) — that
    // stability is exactly what lets `useWizardActions()` consumers skip
    // re-rendering when only `state` changed.
    const actions = useMemo<WizardActions<TState, TAction>>(
      () => ({ dispatch, reset, getState }),
      [dispatch, reset, getState],
    );

    return (
      <WizardActionsContext.Provider value={actions}>
        <WizardStateContext.Provider value={state}>
          {children}
        </WizardStateContext.Provider>
      </WizardActionsContext.Provider>
    );
  }

  return { WizardProvider, useWizard, useWizardActions };
}
