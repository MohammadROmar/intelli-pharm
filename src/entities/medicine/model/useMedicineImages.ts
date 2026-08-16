import { useCallback, useState } from 'react';

import type { ImageFile } from './medicineTypes';

export function useMedicineImages() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleImagesAdd = useCallback((newImgs: ImageFile[]) => {
    setImages((prev) => [...prev, ...newImgs]);
  }, []);

  const handleImageRemove = useCallback((id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return { images, handleImagesAdd, handleImageRemove, clearImages };
}
