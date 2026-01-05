/**
 * @summary
 * Default values and constants for Sorveteria entity.
 * Provides centralized configuration for entity creation, validation limits,
 * and priority level definitions.
 *
 * @module constants/sorveteria/sorveteriaDefaults
 */

/**
 * @interface SorveteriaDefaultsType
 * @description Default configuration values applied when creating new Sorveteria entities.
 *
 * @property {string} NOME_SORVETERIA - Default name for the ice cream shop
 * @property {boolean} ACTIVE - Default active status for new records (true)
 * @property {string} PRIORITY - Default priority level for promotions ('medium')
 */
export const SORVETERIA_DEFAULTS = {
  /** Default name for the ice cream shop */
  NOME_SORVETERIA: 'Tommasi Sorvetes',
  /** Default active status for new records */
  ACTIVE: true,
  /** Default priority for promotions */
  PRIORITY: 'medium' as const,
} as const;

/** Type representing the SORVETERIA_DEFAULTS constant */
export type SorveteriaDefaultsType = typeof SORVETERIA_DEFAULTS;

/**
 * @interface SorveteriaPrioritiesType
 * @description Available priority levels for promotions.
 *
 * @property {string} LOW - Low priority level ('low')
 * @property {string} MEDIUM - Medium priority level ('medium')
 * @property {string} HIGH - High priority level ('high')
 */
export const SORVETERIA_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

/** Type representing the SORVETERIA_PRIORITIES constant */
export type SorveteriaPrioritiesType = typeof SORVETERIA_PRIORITIES;

/** Union type of all valid priority values */
export type SorveteriaPriority = (typeof SORVETERIA_PRIORITIES)[keyof typeof SORVETERIA_PRIORITIES];

/**
 * @interface SorveteriaLimitsType
 * @description Validation constraints for Sorveteria entity fields.
 *
 * @property {number} NOME_MIN_LENGTH - Minimum characters for name field (1)
 * @property {number} NOME_MAX_LENGTH - Maximum characters for name field (200)
 * @property {number} SLOGAN_MAX_LENGTH - Maximum characters for slogan field (50)
 * @property {number} HISTORIA_MIN_LENGTH - Minimum characters for history field (200)
 * @property {number} HISTORIA_MAX_LENGTH - Maximum characters for history field (800)
 * @property {number} FUNDADORES_MAX_LENGTH - Maximum characters for founders field (200)
 * @property {number} DIFERENCIAL_MAX_LENGTH - Maximum characters per differential (100)
 * @property {number} MIN_DIFERENCIAIS - Minimum number of differentials (3)
 * @property {number} MAX_DIFERENCIAIS - Maximum number of differentials (6)
 * @property {number} MIN_FOTOS_AMBIENTE - Minimum number of environment photos (3)
 * @property {number} MAX_FOTOS_AMBIENTE - Maximum number of environment photos (12)
 * @property {number} FOTO_DESCRICAO_MAX_LENGTH - Maximum characters for photo description (150)
 * @property {number} MAX_DEPOIMENTOS - Maximum number of testimonials displayed (6)
 * @property {number} DEPOIMENTO_MAX_LENGTH - Maximum characters per testimonial (300)
 * @property {number} MAX_PROMOCOES - Maximum number of simultaneous promotions (3)
 * @property {number} MISSAO_MAX_LENGTH - Maximum characters for mission (200)
 * @property {number} VISAO_MAX_LENGTH - Maximum characters for vision (200)
 * @property {number} MAX_VALORES - Maximum number of values (5)
 * @property {number} VALOR_MAX_LENGTH - Maximum characters per value (50)
 * @property {number} LOGOTIPO_MAX_SIZE_MB - Maximum logotipo file size in MB (2)
 * @property {number} FOTO_MAX_SIZE_MB - Maximum photo file size in MB (5)
 */
export const SORVETERIA_LIMITS = {
  NOME_MIN_LENGTH: 1,
  NOME_MAX_LENGTH: 200,
  SLOGAN_MAX_LENGTH: 50,
  HISTORIA_MIN_LENGTH: 200,
  HISTORIA_MAX_LENGTH: 800,
  FUNDADORES_MAX_LENGTH: 200,
  DIFERENCIAL_MAX_LENGTH: 100,
  MIN_DIFERENCIAIS: 3,
  MAX_DIFERENCIAIS: 6,
  MIN_FOTOS_AMBIENTE: 3,
  MAX_FOTOS_AMBIENTE: 12,
  FOTO_DESCRICAO_MAX_LENGTH: 150,
  MAX_DEPOIMENTOS: 6,
  DEPOIMENTO_MAX_LENGTH: 300,
  MAX_PROMOCOES: 3,
  MISSAO_MAX_LENGTH: 200,
  VISAO_MAX_LENGTH: 200,
  MAX_VALORES: 5,
  VALOR_MAX_LENGTH: 50,
  LOGOTIPO_MAX_SIZE_MB: 2,
  FOTO_MAX_SIZE_MB: 5,
} as const;

/** Type representing the SORVETERIA_LIMITS constant */
export type SorveteriaLimitsType = typeof SORVETERIA_LIMITS;

/**
 * @interface FotoCategoriesType
 * @description Available categories for environment photos.
 *
 * @property {string} BALCAO - Counter area ('balcao')
 * @property {string} ATENDIMENTO - Service area ('atendimento')
 * @property {string} EXTERNO - External area ('externo')
 * @property {string} GERAL - General area ('geral')
 */
export const FOTO_CATEGORIES = {
  BALCAO: 'balcao',
  ATENDIMENTO: 'atendimento',
  EXTERNO: 'externo',
  GERAL: 'geral',
} as const;

/** Type representing the FOTO_CATEGORIES constant */
export type FotoCategoriesType = typeof FOTO_CATEGORIES;

/** Union type of all valid photo category values */
export type FotoCategory = (typeof FOTO_CATEGORIES)[keyof typeof FOTO_CATEGORIES];

/**
 * @interface StatusModeracaoType
 * @description Available moderation statuses for testimonials.
 *
 * @property {string} PENDENTE - Pending review ('pendente')
 * @property {string} APROVADO - Approved ('aprovado')
 * @property {string} REJEITADO - Rejected ('rejeitado')
 */
export const STATUS_MODERACAO = {
  PENDENTE: 'pendente',
  APROVADO: 'aprovado',
  REJEITADO: 'rejeitado',
} as const;

/** Type representing the STATUS_MODERACAO constant */
export type StatusModeracaoType = typeof STATUS_MODERACAO;

/** Union type of all valid moderation status values */
export type StatusModeracao = (typeof STATUS_MODERACAO)[keyof typeof STATUS_MODERACAO];

/**
 * @interface TipoPromocaoType
 * @description Available promotion types.
 *
 * @property {string} DESCONTO - Discount promotion ('desconto')
 * @property {string} COMBO - Combo promotion ('combo')
 * @property {string} BRINDE - Gift promotion ('brinde')
 * @property {string} ESPECIAL - Special promotion ('especial')
 */
export const TIPO_PROMOCAO = {
  DESCONTO: 'desconto',
  COMBO: 'combo',
  BRINDE: 'brinde',
  ESPECIAL: 'especial',
} as const;

/** Type representing the TIPO_PROMOCAO constant */
export type TipoPromocaoType = typeof TIPO_PROMOCAO;

/** Union type of all valid promotion type values */
export type TipoPromocao = (typeof TIPO_PROMOCAO)[keyof typeof TIPO_PROMOCAO];
