/**
 * @summary
 * Type definitions for Sorveteria entity.
 *
 * @module services/sorveteria/sorveteriaTypes
 */

import {
  SorveteriaPriority,
  FotoCategory,
  StatusModeracao,
  TipoPromocao,
} from '@/constants/sorveteria';

/**
 * @interface SorveteriaMetadata
 * @description Metadata for sorveteria information
 */
export interface SorveteriaMetadata {
  category: string;
  priority: SorveteriaPriority;
}

/**
 * @interface HorarioSemana
 * @description Operating hours for each day of the week
 */
export interface HorarioSemana {
  segunda: { abertura: string; fechamento: string; fechado: boolean };
  terca: { abertura: string; fechamento: string; fechado: boolean };
  quarta: { abertura: string; fechamento: string; fechado: boolean };
  quinta: { abertura: string; fechamento: string; fechado: boolean };
  sexta: { abertura: string; fechamento: string; fechado: boolean };
  sabado: { abertura: string; fechamento: string; fechado: boolean };
  domingo: { abertura: string; fechamento: string; fechado: boolean };
}

/**
 * @interface HorarioEspecial
 * @description Special operating hours for holidays or special dates
 */
export interface HorarioEspecial {
  data: string;
  descricao: string;
  abertura: string | null;
  fechamento: string | null;
  fechado: boolean;
}

/**
 * @interface FotoAmbiente
 * @description Environment photo information
 */
export interface FotoAmbiente {
  id: number;
  url: string;
  descricao: string | null;
  categoria: FotoCategory;
  ordem: number;
}

/**
 * @interface Depoimento
 * @description Customer testimonial information
 */
export interface Depoimento {
  id: number;
  nomeCliente: string;
  texto: string;
  avaliacao: number;
  statusModeracao: StatusModeracao;
  dataCriacao: string;
}

/**
 * @interface Promocao
 * @description Promotion information
 */
export interface Promocao {
  id: number;
  titulo: string;
  descricao: string;
  dataValidade: string;
  prioridade: number;
  tipo: TipoPromocao;
  ativa: boolean;
}

/**
 * @interface SorveteriaEntity
 * @description Represents the complete sorveteria information entity
 */
export interface SorveteriaEntity {
  id: number;
  nomeSorveteria: string;
  logotipo: string;
  slogan: string | null;
  historiaSorveteria: string;
  anoFundacao: number;
  diferenciais: string[];
  fundadores: string;
  horariosSemana: HorarioSemana;
  horariosEspeciais: HorarioEspecial[];
  statusFuncionamento: 'aberto' | 'fechado' | 'abrindo_em_breve';
  fotosAmbiente: FotoAmbiente[];
  depoimentos: Depoimento[];
  avaliacaoMedia: number | null;
  totalAvaliacoes: number;
  promocoesAtivas: Promocao[];
  missao: string | null;
  visao: string | null;
  valores: string[];
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface SorveteriaCreateRequest
 * @description Request payload for creating sorveteria information
 */
export interface SorveteriaCreateRequest {
  nomeSorveteria: string;
  logotipo: string;
  slogan?: string | null;
  historiaSorveteria: string;
  anoFundacao: number;
  diferenciais: string[];
  fundadores: string;
  horariosSemana: HorarioSemana;
  horariosEspeciais?: HorarioEspecial[];
  missao?: string | null;
  visao?: string | null;
  valores?: string[];
}

/**
 * @interface SorveteriaUpdateRequest
 * @description Request payload for updating sorveteria information
 */
export interface SorveteriaUpdateRequest {
  nomeSorveteria?: string;
  logotipo?: string;
  slogan?: string | null;
  historiaSorveteria?: string;
  anoFundacao?: number;
  diferenciais?: string[];
  fundadores?: string;
  horariosSemana?: HorarioSemana;
  horariosEspeciais?: HorarioEspecial[];
  missao?: string | null;
  visao?: string | null;
  valores?: string[];
}

/**
 * @interface FotoAmbienteCreateRequest
 * @description Request payload for adding environment photo
 */
export interface FotoAmbienteCreateRequest {
  url: string;
  descricao?: string | null;
  categoria: FotoCategory;
}

/**
 * @interface DepoimentoCreateRequest
 * @description Request payload for creating testimonial
 */
export interface DepoimentoCreateRequest {
  nomeCliente: string;
  texto: string;
  avaliacao: number;
}

/**
 * @interface PromocaoCreateRequest
 * @description Request payload for creating promotion
 */
export interface PromocaoCreateRequest {
  titulo: string;
  descricao: string;
  dataValidade: string;
  prioridade: number;
  tipo: TipoPromocao;
}
