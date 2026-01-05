/**
 * @summary
 * Section displaying active promotions.
 * Shows promotions ordered by priority with visual indicators.
 */

import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { TagIcon, CalendarIcon } from 'lucide-react';
import type { PromocoesSectionProps } from './types';

function PromocoesSection({ sorveteria, className }: PromocoesSectionProps) {
  if (!sorveteria.promocoesAtivas || sorveteria.promocoesAtivas.length === 0) {
    return null;
  }

  const getPromocaoIcon = (_tipo: string) => {
    return <TagIcon className="size-5" />;
  };

  const getPromocaoColor = (prioridade: number) => {
    if (prioridade === 1) {
      return 'border-primary bg-primary/5';
    }
    return 'border-border bg-card';
  };

  return (
    <section className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="size-5" />
            Promoções Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorveteria.promocoesAtivas.map((promocao) => (
              <div
                key={promocao.id}
                className={cn(
                  'flex flex-col gap-3 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md',
                  getPromocaoColor(promocao.prioridade)
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getPromocaoIcon(promocao.tipo)}
                    <Badge
                      variant={promocao.prioridade === 1 ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {promocao.tipo}
                    </Badge>
                  </div>
                  {promocao.prioridade === 1 && (
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Destaque
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{promocao.titulo}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {promocao.descricao}
                  </p>
                </div>
                <div className="border-t pt-3">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <CalendarIcon className="size-3" />
                    Válido até {new Date(promocao.dataValidade).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export { PromocoesSection };
