/**
 * @summary
 * Sorveteria domain module exports.
 * Centralizes all exports for the sorveteria domain.
 */

export * from './components/SorveteriaHeader';
export * from './components/HistoriaSection';
export * from './components/HorarioSection';
export * from './components/GaleriaFotos';
export * from './components/DepoimentosSection';
export * from './components/PromocoesSection';
export * from './components/MissaoVisaoValores';
export * from './hooks/useSorveteria';
export * from './services/sorveteriaService';

export type {
  Sorveteria,
  HorariosSemana,
  HorarioDia,
  HorarioEspecial,
  FotoAmbiente,
  Depoimento,
  Promocao,
} from './types/models';
