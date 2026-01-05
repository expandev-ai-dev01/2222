/**
 * @summary
 * Photo gallery component for environment photos.
 * Displays photos in a responsive grid with lightbox functionality.
 */

import { useState } from 'react';
import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Dialog, DialogContent } from '@/core/components/dialog';
import { ImageIcon, XIcon } from 'lucide-react';
import { Button } from '@/core/components/button';
import type { GaleriaFotosProps } from './types';

function GaleriaFotos({ sorveteria, className }: GaleriaFotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  if (!sorveteria.fotosAmbiente || sorveteria.fotosAmbiente.length === 0) {
    return null;
  }

  const currentPhoto = selectedPhoto !== null ? sorveteria.fotosAmbiente[selectedPhoto] : null;

  return (
    <section className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="size-5" />
            Nosso Ambiente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorveteria.fotosAmbiente.map((foto, index) => (
              <button
                key={foto.id}
                onClick={() => setSelectedPhoto(index)}
                className="bg-muted focus-visible:ring-ring group relative aspect-video overflow-hidden rounded-lg border transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2"
              >
                <img
                  src={foto.url}
                  alt={foto.descricao || `Foto do ambiente ${index + 1}`}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                {foto.descricao && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-sm text-white">{foto.descricao}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={selectedPhoto !== null}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-4xl p-0" showCloseButton={false}>
          {currentPhoto && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setSelectedPhoto(null)}
              >
                <XIcon className="size-4" />
              </Button>
              <img
                src={currentPhoto.url}
                alt={currentPhoto.descricao || 'Foto do ambiente'}
                className="w-full rounded-lg"
              />
              {currentPhoto.descricao && (
                <div className="bg-muted p-4">
                  <p className="text-sm">{currentPhoto.descricao}</p>
                </div>
              )}
              <div className="flex items-center justify-between border-t p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedPhoto((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : sorveteria.fotosAmbiente.length - 1
                    )
                  }
                >
                  Anterior
                </Button>
                <span className="text-muted-foreground text-sm">
                  {selectedPhoto !== null ? selectedPhoto + 1 : 0} de{' '}
                  {sorveteria.fotosAmbiente.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedPhoto((prev) =>
                      prev !== null && prev < sorveteria.fotosAmbiente.length - 1 ? prev + 1 : 0
                    )
                  }
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export { GaleriaFotos };
