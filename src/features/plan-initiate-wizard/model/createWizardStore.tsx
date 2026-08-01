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
  getState: () => TState;
};

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
      dispatch({ type: 'RESET' } as TAction);
    }, []);

    const getState = useCallback(() => stateRef.current, [stateRef]);

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
