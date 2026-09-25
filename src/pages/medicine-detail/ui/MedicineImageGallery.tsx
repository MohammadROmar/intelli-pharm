import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageOff } from 'lucide-react';

import { cn } from '@/shared/lib';

type Props = { images?: string[] };

export function MedicineImageGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { t } = useTranslation('medicines', {
    keyPrefix: 'detail',
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
              alt={`${t('imageAlt')} ${activeIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-opacity duration-200"
            />
          </>
        ) : (
          <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2">
            <ImageOff className="size-10" />
            <p className="text-sm">{t('noImages')}</p>
          </div>
        )}
      </div>

      {images && images.length > 1 && (
        <div className="thin-scrollbar flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                'bg-muted md:maw-40 relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                i === activeIndex
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={src}
                alt={`${t('thumbnail')} ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
