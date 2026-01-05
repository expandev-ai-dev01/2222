/**
 * @summary
 * Section displaying sorveteria history and differentials.
 * Shows foundation year, history text, founders, and key differentials.
 */

import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { CalendarIcon, UsersIcon, StarIcon } from 'lucide-react';
import type { HistoriaSectionProps } from './types';

function HistoriaSection({ sorveteria, className }: HistoriaSectionProps) {
  return (
    <section className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5" />
            Nossa História
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary">Fundada em {sorveteria.anoFundacao}</Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">{sorveteria.historiaSorveteria}</p>
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <UsersIcon className="size-4" />
              Fundadores
            </div>
            <p className="text-muted-foreground mt-2 text-sm">{sorveteria.fundadores}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StarIcon className="size-5" />
            Nossos Diferenciais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2">
            {sorveteria.diferenciais.map((diferencial, index) => (
              <li
                key={index}
                className="bg-muted/50 hover:bg-muted flex items-start gap-2 rounded-lg border p-3 transition-colors"
              >
                <StarIcon className="text-primary size-4 mt-0.5 shrink-0 fill-current" />
                <span className="text-sm">{diferencial}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

export { HistoriaSection };
