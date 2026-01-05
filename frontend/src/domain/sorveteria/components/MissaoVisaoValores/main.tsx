/**
 * @summary
 * Section displaying mission, vision, and values.
 * Only renders if at least one field is populated.
 */

import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { TargetIcon, EyeIcon, HeartIcon } from 'lucide-react';
import type { MissaoVisaoValoresProps } from './types';

function MissaoVisaoValores({ sorveteria, className }: MissaoVisaoValoresProps) {
  const hasContent =
    sorveteria.missao || sorveteria.visao || (sorveteria.valores && sorveteria.valores.length > 0);

  if (!hasContent) {
    return null;
  }

  return (
    <section className={cn('space-y-6', className)}>
      {sorveteria.missao && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TargetIcon className="size-5" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{sorveteria.missao}</p>
          </CardContent>
        </Card>
      )}

      {sorveteria.visao && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EyeIcon className="size-5" />
              Nossa Visão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{sorveteria.visao}</p>
          </CardContent>
        </Card>
      )}

      {sorveteria.valores && sorveteria.valores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartIcon className="size-5" />
              Nossos Valores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2">
              {sorveteria.valores.map((valor, index) => (
                <li
                  key={index}
                  className="bg-muted/50 hover:bg-muted flex items-start gap-2 rounded-lg border p-3 transition-colors"
                >
                  <HeartIcon className="text-primary size-4 mt-0.5 shrink-0 fill-current" />
                  <span className="text-sm">{valor}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

export { MissaoVisaoValores };
