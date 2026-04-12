import { useEffect, useRef, useState, useCallback } from 'react';

import type {
  MedicineMetric,
  MedicineMetricsSummary,
  MetricsWorkerRequest,
  MetricsWorkerResponse,
} from '../model/medicineMetricsTypes';

export function useMedicineMetricsWorker() {
  const workerRef = useRef<Worker | null>(null);

  const [summary, setSummary] = useState<MedicineMetricsSummary | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../lib/medicineMetricsWorker', import.meta.url),
      { type: 'module' },
    );

    workerRef.current.onmessage = (
      event: MessageEvent<MetricsWorkerResponse>,
    ) => {
      const message = event.data;

      if (message.type === 'SUCCESS') {
        setSummary(message.payload);
        setError(null);
      } else if (message.type === 'ERROR') {
        setError(message.error);
      }
      setIsCalculating(false);
    };

    workerRef.current.onerror = (e) => {
      setError(`Worker thread error: ${e.message}`);
      setIsCalculating(false);
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const calculate = useCallback((data: MedicineMetric[]) => {
    if (!workerRef.current) return;

    setIsCalculating(true);
    setError(null);

    workerRef.current.postMessage({
      type: 'CALCULATE_METRICS',
      payload: data,
    } satisfies MetricsWorkerRequest);
  }, []);

  return {
    summary,
    isCalculating,
    error,
    calculate,
  };
}
