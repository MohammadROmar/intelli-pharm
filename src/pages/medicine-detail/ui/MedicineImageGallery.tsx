import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageOff } from 'lucide-react';

import { Badge } from '@/shared/ui';
import { cn } from '@/shared/lib';

interface Props {
  images?: string[];
  medicineName: string;
}

export function MedicineImageGallery({ images, medicineName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  const hasImages = images ? images.length > 0 : 0;

  return (
    <div className="space-y-3">
      <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-xl border">
        {hasImages ? (
          <>
            <img
              key={activeIndex}
              src={images![activeIndex]}
              alt={`${medicineName} — ${t('imageAlt')} ${activeIndex + 1}`}
              className="h-full w-full object-cover transition-opacity duration-200"
            />
            {activeIndex === 0 && (
              <Badge className="absolute top-3 right-3 shadow-sm">
                {t('primaryImage')}
              </Badge>
            )}
          </>
        ) : (
          <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2">
            <ImageOff className="size-10" />
            <p className="text-sm">{t('noImages')}</p>
          </div>
        )}
      </div>

      {images && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                'bg-muted relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === activeIndex
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={src}
                alt={`${medicineName} ${t('thumbnail')} ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
