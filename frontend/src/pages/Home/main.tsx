/**
 * @summary
 * Home page displaying complete sorveteria information.
 * Integrates all sorveteria components in a cohesive layout.
 */

import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { AlertCircle } from 'lucide-react';
import {
  useSorveteria,
  SorveteriaHeader,
  HistoriaSection,
  HorarioSection,
  GaleriaFotos,
  DepoimentosSection,
  PromocoesSection,
  MissaoVisaoValores,
} from '@/domain/sorveteria/_module';

function HomePage() {
  const { sorveteria, isLoading, error } = useSorveteria();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="size-4" />
          <AlertTitle>Erro ao carregar informações</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as informações da sorveteria. Por favor, tente novamente mais
            tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!sorveteria) {
    return null;
  }

  return (
    <div className="space-y-8 py-8">
      <SorveteriaHeader sorveteria={sorveteria} />

      <div className="grid gap-8 lg:grid-cols-2">
        <HistoriaSection sorveteria={sorveteria} />
        <HorarioSection sorveteria={sorveteria} />
      </div>

      <GaleriaFotos sorveteria={sorveteria} />

      <PromocoesSection sorveteria={sorveteria} />

      <DepoimentosSection sorveteria={sorveteria} />

      <MissaoVisaoValores sorveteria={sorveteria} />
    </div>
  );
}

export { HomePage };
