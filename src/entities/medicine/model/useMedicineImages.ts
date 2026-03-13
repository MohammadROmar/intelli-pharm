import { useCallback, useState } from 'react';

import type { ImageFile } from './medicineTypes';

export function useMedicineImages() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleImagesAdd = useCallback((newImgs: ImageFile[]) => {
    setImages((prev) => [...prev, ...newImgs]);
  }, []);

  const handleImageRemove = useCallback((id: string) => {
    setImages((prev) => {
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return { images, handleImagesAdd, handleImageRemove, clearImages };
}
