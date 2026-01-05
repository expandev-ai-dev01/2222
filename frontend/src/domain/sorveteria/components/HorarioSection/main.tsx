/**
 * @summary
 * Section displaying operating hours and current status.
 * Shows weekly schedule, special hours, and real-time open/closed status.
 */

import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { ClockIcon, CalendarIcon } from 'lucide-react';
import type { HorarioSectionProps } from './types';

function HorarioSection({ sorveteria, className }: HorarioSectionProps) {
  const diasSemana = [
    { key: 'segunda', label: 'Segunda-feira' },
    { key: 'terca', label: 'Terça-feira' },
    { key: 'quarta', label: 'Quarta-feira' },
    { key: 'quinta', label: 'Quinta-feira' },
    { key: 'sexta', label: 'Sexta-feira' },
    { key: 'sabado', label: 'Sábado' },
    { key: 'domingo', label: 'Domingo' },
  ];

  const getStatusBadge = () => {
    switch (sorveteria.statusFuncionamento) {
      case 'aberto':
        return (
          <Badge variant="default" className="bg-green-500 text-white hover:bg-green-600">
            Aberto Agora
          </Badge>
        );
      case 'fechado':
        return (
          <Badge variant="destructive" className="bg-red-500 text-white hover:bg-red-600">
            Fechado
          </Badge>
        );
      case 'abrindo_em_breve':
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600">
            Abrindo em Breve
          </Badge>
        );
    }
  };

  return (
    <section className={cn('space-y-6', className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="size-5" />
              Horário de Funcionamento
            </CardTitle>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {diasSemana.map(({ key, label }) => {
              const horario =
                sorveteria.horariosSemana[key as keyof typeof sorveteria.horariosSemana];
              return (
                <div
                  key={key}
                  className="bg-muted/50 flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <span className="font-medium">{label}</span>
                  <span className="text-muted-foreground">
                    {horario.fechado ? (
                      <Badge variant="outline">Fechado</Badge>
                    ) : (
                      `${horario.abertura} - ${horario.fechamento}`
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {sorveteria.horariosEspeciais && sorveteria.horariosEspeciais.length > 0 && (
            <div className="border-t pt-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <CalendarIcon className="size-4" />
                Horários Especiais
              </div>
              <div className="space-y-2">
                {sorveteria.horariosEspeciais.map((especial, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-yellow-50 p-3 text-sm dark:bg-yellow-950/20"
                  >
                    <div className="font-medium">{especial.descricao}</div>
                    <div className="text-muted-foreground mt-1 text-xs">
                      {new Date(especial.data).toLocaleDateString('pt-BR')} -{' '}
                      {especial.fechado ? (
                        <span className="text-red-600 dark:text-red-400">Fechado</span>
                      ) : (
                        `${especial.abertura} - ${especial.fechamento}`
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export { HorarioSection };
