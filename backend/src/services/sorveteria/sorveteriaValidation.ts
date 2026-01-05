/**
 * @summary
 * Validation schemas for Sorveteria entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/sorveteria/sorveteriaValidation
 */

import { z } from 'zod';
import {
  SORVETERIA_LIMITS,
  SORVETERIA_PRIORITIES,
  FOTO_CATEGORIES,
  STATUS_MODERACAO,
  TIPO_PROMOCAO,
} from '@/constants';

/**
 * Schema for operating hours validation
 */
export const horarioDiaSchema = z.object({
  abertura: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  fechamento: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  fechado: z.boolean(),
});

export const horariosSemanaSchema = z.object({
  segunda: horarioDiaSchema,
  terca: horarioDiaSchema,
  quarta: horarioDiaSchema,
  quinta: horarioDiaSchema,
  sexta: horarioDiaSchema,
  sabado: horarioDiaSchema,
  domingo: horarioDiaSchema,
});

/**
 * Schema for special hours validation
 */
export const horarioEspecialSchema = z.object({
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  descricao: z.string().min(1).max(200),
  abertura: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .nullable(),
  fechamento: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .nullable(),
  fechado: z.boolean(),
});

/**
 * Schema for create request validation
 */
export const createSchema = z.object({
  nomeSorveteria: z
    .string()
    .min(SORVETERIA_LIMITS.NOME_MIN_LENGTH)
    .max(SORVETERIA_LIMITS.NOME_MAX_LENGTH),
  logotipo: z.string().url(),
  slogan: z.string().max(SORVETERIA_LIMITS.SLOGAN_MAX_LENGTH).nullable().optional(),
  historiaSorveteria: z
    .string()
    .min(SORVETERIA_LIMITS.HISTORIA_MIN_LENGTH)
    .max(SORVETERIA_LIMITS.HISTORIA_MAX_LENGTH),
  anoFundacao: z.number().int().min(1900).max(new Date().getFullYear()),
  diferenciais: z
    .array(z.string().max(SORVETERIA_LIMITS.DIFERENCIAL_MAX_LENGTH))
    .min(SORVETERIA_LIMITS.MIN_DIFERENCIAIS)
    .max(SORVETERIA_LIMITS.MAX_DIFERENCIAIS),
  fundadores: z.string().max(SORVETERIA_LIMITS.FUNDADORES_MAX_LENGTH),
  horariosSemana: horariosSemanaSchema,
  horariosEspeciais: z.array(horarioEspecialSchema).optional(),
  missao: z.string().max(SORVETERIA_LIMITS.MISSAO_MAX_LENGTH).nullable().optional(),
  visao: z.string().max(SORVETERIA_LIMITS.VISAO_MAX_LENGTH).nullable().optional(),
  valores: z
    .array(z.string().max(SORVETERIA_LIMITS.VALOR_MAX_LENGTH))
    .max(SORVETERIA_LIMITS.MAX_VALORES)
    .optional(),
});

/**
 * Schema for update request validation
 */
export const updateSchema = z.object({
  nomeSorveteria: z
    .string()
    .min(SORVETERIA_LIMITS.NOME_MIN_LENGTH)
    .max(SORVETERIA_LIMITS.NOME_MAX_LENGTH)
    .optional(),
  logotipo: z.string().url().optional(),
  slogan: z.string().max(SORVETERIA_LIMITS.SLOGAN_MAX_LENGTH).nullable().optional(),
  historiaSorveteria: z
    .string()
    .min(SORVETERIA_LIMITS.HISTORIA_MIN_LENGTH)
    .max(SORVETERIA_LIMITS.HISTORIA_MAX_LENGTH)
    .optional(),
  anoFundacao: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  diferenciais: z
    .array(z.string().max(SORVETERIA_LIMITS.DIFERENCIAL_MAX_LENGTH))
    .min(SORVETERIA_LIMITS.MIN_DIFERENCIAIS)
    .max(SORVETERIA_LIMITS.MAX_DIFERENCIAIS)
    .optional(),
  fundadores: z.string().max(SORVETERIA_LIMITS.FUNDADORES_MAX_LENGTH).optional(),
  horariosSemana: horariosSemanaSchema.optional(),
  horariosEspeciais: z.array(horarioEspecialSchema).optional(),
  missao: z.string().max(SORVETERIA_LIMITS.MISSAO_MAX_LENGTH).nullable().optional(),
  visao: z.string().max(SORVETERIA_LIMITS.VISAO_MAX_LENGTH).nullable().optional(),
  valores: z
    .array(z.string().max(SORVETERIA_LIMITS.VALOR_MAX_LENGTH))
    .max(SORVETERIA_LIMITS.MAX_VALORES)
    .optional(),
});

/**
 * Schema for photo create request validation
 */
export const fotoCreateSchema = z.object({
  url: z.string().url(),
  descricao: z.string().max(SORVETERIA_LIMITS.FOTO_DESCRICAO_MAX_LENGTH).nullable().optional(),
  categoria: z.enum([
    FOTO_CATEGORIES.BALCAO,
    FOTO_CATEGORIES.ATENDIMENTO,
    FOTO_CATEGORIES.EXTERNO,
    FOTO_CATEGORIES.GERAL,
  ]),
});

/**
 * Schema for testimonial create request validation
 */
export const depoimentoCreateSchema = z.object({
  nomeCliente: z.string().min(1).max(100),
  texto: z.string().min(1).max(SORVETERIA_LIMITS.DEPOIMENTO_MAX_LENGTH),
  avaliacao: z.number().int().min(1).max(5),
});

/**
 * Schema for promotion create request validation
 */
export const promocaoCreateSchema = z.object({
  titulo: z.string().min(1).max(200),
  descricao: z.string().min(1).max(500),
  dataValidade: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  prioridade: z.number().int().min(1).max(5),
  tipo: z.enum([
    TIPO_PROMOCAO.DESCONTO,
    TIPO_PROMOCAO.COMBO,
    TIPO_PROMOCAO.BRINDE,
    TIPO_PROMOCAO.ESPECIAL,
  ]),
});

/**
 * Schema for ID parameter validation
 */
export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type FotoCreateInput = z.infer<typeof fotoCreateSchema>;
export type DepoimentoCreateInput = z.infer<typeof depoimentoCreateSchema>;
export type PromocaoCreateInput = z.infer<typeof promocaoCreateSchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
