type StoredDraft<TState> = { version: number; state: TState };

export function createWizardDraftStorage<TState>(
  storageKey: string,
  version: number,
) {
  function loadDraft(): TState | null {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      const parsed: StoredDraft<TState> = JSON.parse(raw);
      if (parsed.version !== version) return null;
      return parsed.state;
    } catch {
      return null;
    }
  }

  function saveDraft(state: TState): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version, state }));
    } catch {
      /* silent — draft persistence is a convenience, not a hard requirement */
    }
  }

  function clearDraft(): void {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* silent */
    }
  }

  return { loadDraft, saveDraft, clearDraft };
}
