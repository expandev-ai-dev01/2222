/**
 * @summary
 * Type definitions for Sorveteria domain models.
 * Represents the data structures returned by the backend API.
 *
 * @module domain/sorveteria/types/models
 */

export interface Sorveteria {
  id: number;
  nomeSorveteria: string;
  logotipo: string;
  slogan: string | null;
  historiaSorveteria: string;
  anoFundacao: number;
  diferenciais: string[];
  fundadores: string;
  horariosSemana: HorariosSemana;
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

export interface HorariosSemana {
  segunda: HorarioDia;
  terca: HorarioDia;
  quarta: HorarioDia;
  quinta: HorarioDia;
  sexta: HorarioDia;
  sabado: HorarioDia;
  domingo: HorarioDia;
}

export interface HorarioDia {
  abertura: string;
  fechamento: string;
  fechado: boolean;
}

export interface HorarioEspecial {
  data: string;
  descricao: string;
  abertura: string | null;
  fechamento: string | null;
  fechado: boolean;
}

export interface FotoAmbiente {
  id: number;
  url: string;
  descricao: string | null;
  categoria: 'balcao' | 'atendimento' | 'externo' | 'geral';
  ordem: number;
}

export interface Depoimento {
  id: number;
  nomeCliente: string;
  texto: string;
  avaliacao: number;
  statusModeracao: 'pendente' | 'aprovado' | 'rejeitado';
  dataCriacao: string;
}

export interface Promocao {
  id: number;
  titulo: string;
  descricao: string;
  dataValidade: string;
  prioridade: number;
  tipo: 'desconto' | 'combo' | 'brinde' | 'especial';
  ativa: boolean;
}
