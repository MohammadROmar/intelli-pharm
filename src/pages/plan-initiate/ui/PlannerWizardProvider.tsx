import { useCallback, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';

import { clearDraft, loadDraft, saveDraft } from '../lib/utils';
import { wizardReducer, WIZARD_INITIAL_STATE } from '../lib/utils';
import { WizardContext } from '../model/PlannerWizardContext/context';

export function PlannerWizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    wizardReducer,
    WIZARD_INITIAL_STATE,
    (initial) => loadDraft() ?? initial,
  );

  useEffect(() => {
    saveDraft(state);
  }, [state]);

  const reset = useCallback(() => {
    clearDraft();
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <WizardContext.Provider value={{ state, dispatch, reset }}>
      {children}
    </WizardContext.Provider>
  );
}
