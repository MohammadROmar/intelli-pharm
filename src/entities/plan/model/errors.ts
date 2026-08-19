export class PlanGenerationFailedError extends Error {
  constructor(message?: string | null) {
    super(message ?? 'Plan generation failed');
    this.name = 'PlanGenerationFailedError';
  }
}

export class PlanGenerationTimeoutError extends Error {
  constructor() {
    super('Plan generation timed out while waiting for a result');
    this.name = 'PlanGenerationTimeoutError';
  }
}
