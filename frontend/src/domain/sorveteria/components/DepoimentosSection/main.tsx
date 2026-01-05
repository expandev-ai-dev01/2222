/**
 * @summary
 * Section displaying customer testimonials and ratings.
 * Shows approved testimonials with star ratings and average score.
 */

import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { StarIcon, MessageSquareIcon } from 'lucide-react';
import type { DepoimentosSectionProps } from './types';

function DepoimentosSection({ sorveteria, className }: DepoimentosSectionProps) {
  if (!sorveteria.depoimentos || sorveteria.depoimentos.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={cn(
              'size-4',
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-muted text-muted-foreground'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquareIcon className="size-5" />
              Depoimentos
            </CardTitle>
            {sorveteria.avaliacaoMedia !== null && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold">{sorveteria.avaliacaoMedia.toFixed(1)}</span>
                </div>
                <Badge variant="secondary">{sorveteria.totalAvaliacoes} avaliações</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorveteria.depoimentos.map((depoimento) => (
              <div
                key={depoimento.id}
                className="bg-muted/50 hover:bg-muted flex flex-col gap-3 rounded-lg border p-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-medium">{depoimento.nomeCliente}</div>
                    <div className="text-muted-foreground text-xs">
                      {new Date(depoimento.dataCriacao).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  {renderStars(depoimento.avaliacao)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{depoimento.texto}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export { DepoimentosSection };
