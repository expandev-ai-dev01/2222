/**
 * @summary
 * Business logic for Sorveteria entity.
 * Handles CRUD operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/sorveteria/sorveteriaService
 */

import { z } from 'zod';
import { SORVETERIA_DEFAULTS, SORVETERIA_LIMITS, FOTO_CATEGORIES } from '@/constants';
import { sorveteriaStore } from '@/instances';
import { ServiceError } from '@/utils';
import { SorveteriaEntity, FotoAmbiente, Depoimento, Promocao } from './sorveteriaTypes';
import {
  createSchema,
  updateSchema,
  fotoCreateSchema,
  depoimentoCreateSchema,
  promocaoCreateSchema,
  paramsSchema,
} from './sorveteriaValidation';

/**
 * @summary
 * Gets the sorveteria information.
 *
 * @function sorveteriaGet
 * @module services/sorveteria
 *
 * @returns {Promise<SorveteriaEntity>} The sorveteria entity
 *
 * @throws {ServiceError} NOT_FOUND (404) - When sorveteria information does not exist
 *
 * @example
 * const info = await sorveteriaGet();
 * // Returns: { id: 1, nomeSorveteria: 'Tommasi Sorvetes', ... }
 */
export async function sorveteriaGet(): Promise<SorveteriaEntity> {
  const sorveteria = sorveteriaStore.get();

  if (!sorveteria) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria information not found', 404);
  }

  // Update operating status before returning
  sorveteriaStore.updateStatusFuncionamento();

  return sorveteriaStore.get()!;
}

/**
 * @summary
 * Creates or updates the sorveteria information.
 *
 * @function sorveteriaCreateOrUpdate
 * @module services/sorveteria
 *
 * @param {unknown} body - Raw request body to validate against createSchema
 * @returns {Promise<SorveteriaEntity>} The created/updated sorveteria entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 *
 * @example
 * const info = await sorveteriaCreateOrUpdate({ nomeSorveteria: 'Tommasi Sorvetes', ... });
 * // Returns: { id: 1, nomeSorveteria: 'Tommasi Sorvetes', ... }
 */
export async function sorveteriaCreateOrUpdate(body: unknown): Promise<SorveteriaEntity> {
  const validation = createSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;

  // Validate required elements in history
  const historiaLower = params.historiaSorveteria.toLowerCase();
  const requiredElements = ['origem', 'tradição', 'qualidade'];
  const missingElements = requiredElements.filter((el) => !historiaLower.includes(el));

  if (missingElements.length > 0) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      `História deve incluir: ${missingElements.join(', ')}`,
      400
    );
  }

  // Validate required differentials
  const requiredDiferenciais = ['qualidade', 'tradição', 'atendimento'];
  const diferenciais = params.diferenciais.map((d) => d.toLowerCase());
  const missingDiferenciais = requiredDiferenciais.filter(
    (req) => !diferenciais.some((d) => d.includes(req))
  );

  if (missingDiferenciais.length > 0) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      `Diferenciais devem incluir: ${missingDiferenciais.join(', ')}`,
      400
    );
  }

  const newSorveteria = sorveteriaStore.set({
    nomeSorveteria: params.nomeSorveteria,
    logotipo: params.logotipo,
    slogan: params.slogan || null,
    historiaSorveteria: params.historiaSorveteria,
    anoFundacao: params.anoFundacao,
    diferenciais: params.diferenciais,
    fundadores: params.fundadores,
    horariosSemana: params.horariosSemana,
    horariosEspeciais: params.horariosEspeciais || [],
    statusFuncionamento: 'fechado',
    fotosAmbiente: [],
    depoimentos: [],
    avaliacaoMedia: null,
    totalAvaliacoes: 0,
    promocoesAtivas: [],
    missao: params.missao || null,
    visao: params.visao || null,
    valores: params.valores || [],
  });

  sorveteriaStore.updateStatusFuncionamento();

  return newSorveteria;
}

/**
 * @summary
 * Updates partial sorveteria information.
 *
 * @function sorveteriaUpdate
 * @module services/sorveteria
 *
 * @param {unknown} body - Raw request body with update data to validate
 * @returns {Promise<SorveteriaEntity>} The updated sorveteria entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When sorveteria does not exist
 *
 * @example
 * const updated = await sorveteriaUpdate({ slogan: 'Novo slogan' });
 * // Returns: { id: 1, slogan: 'Novo slogan', ... }
 */
export async function sorveteriaUpdate(body: unknown): Promise<SorveteriaEntity> {
  const validation = updateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const existing = sorveteriaStore.get();

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  const updated = sorveteriaStore.update(validation.data);

  if (!updated) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  sorveteriaStore.updateStatusFuncionamento();

  return updated;
}

/**
 * @summary
 * Adds an environment photo.
 *
 * @function sorveteriaAddFoto
 * @module services/sorveteria
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<FotoAmbiente>} The added photo
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When sorveteria does not exist
 * @throws {ServiceError} LIMIT_EXCEEDED (400) - When photo limit is reached
 *
 * @example
 * const foto = await sorveteriaAddFoto({ url: 'https://...', categoria: 'balcao' });
 * // Returns: { id: 1, url: 'https://...', categoria: 'balcao', ... }
 */
export async function sorveteriaAddFoto(body: unknown): Promise<FotoAmbiente> {
  const validation = fotoCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const sorveteria = sorveteriaStore.get();

  if (!sorveteria) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  if (sorveteria.fotosAmbiente.length >= SORVETERIA_LIMITS.MAX_FOTOS_AMBIENTE) {
    throw new ServiceError(
      'LIMIT_EXCEEDED',
      `Maximum of ${SORVETERIA_LIMITS.MAX_FOTOS_AMBIENTE} photos allowed`,
      400
    );
  }

  const foto = sorveteriaStore.addFoto({
    ...validation.data,
    descricao: validation.data.descricao ?? null,
  });

  if (!foto) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  return foto;
}

/**
 * @summary
 * Removes an environment photo.
 *
 * @function sorveteriaRemoveFoto
 * @module services/sorveteria
 *
 * @param {unknown} params - Raw request params containing the photo ID
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When photo does not exist
 *
 * @example
 * const result = await sorveteriaRemoveFoto({ id: '1' });
 * // Returns: { message: 'Photo removed successfully' }
 */
export async function sorveteriaRemoveFoto(params: unknown): Promise<{ message: string }> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const removed = sorveteriaStore.removeFoto(id);

  if (!removed) {
    throw new ServiceError('NOT_FOUND', 'Photo not found', 404);
  }

  return { message: 'Photo removed successfully' };
}

/**
 * @summary
 * Adds a customer testimonial.
 *
 * @function sorveteriaAddDepoimento
 * @module services/sorveteria
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<Depoimento>} The added testimonial
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When sorveteria does not exist
 *
 * @example
 * const depoimento = await sorveteriaAddDepoimento({ nomeCliente: 'João', texto: '...', avaliacao: 5 });
 * // Returns: { id: 1, nomeCliente: 'João', statusModeracao: 'pendente', ... }
 */
export async function sorveteriaAddDepoimento(body: unknown): Promise<Depoimento> {
  const validation = depoimentoCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const depoimento = sorveteriaStore.addDepoimento(validation.data);

  if (!depoimento) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  return depoimento;
}

/**
 * @summary
 * Updates testimonial moderation status.
 *
 * @function sorveteriaUpdateDepoimentoStatus
 * @module services/sorveteria
 *
 * @param {unknown} params - Raw request params containing the testimonial ID
 * @param {unknown} body - Raw request body with status
 * @returns {Promise<Depoimento>} The updated testimonial
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When params or body fail validation
 * @throws {ServiceError} NOT_FOUND (404) - When testimonial does not exist
 *
 * @example
 * const depoimento = await sorveteriaUpdateDepoimentoStatus({ id: '1' }, { status: 'aprovado' });
 * // Returns: { id: 1, statusModeracao: 'aprovado', ... }
 */
export async function sorveteriaUpdateDepoimentoStatus(
  params: unknown,
  body: unknown
): Promise<Depoimento> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = z
    .object({
      status: z.enum(['pendente', 'aprovado', 'rejeitado']),
    })
    .safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid status', 400, bodyValidation.error.errors);
  }

  const { id } = paramsValidation.data;
  const { status } = bodyValidation.data;

  const depoimento = sorveteriaStore.updateDepoimentoStatus(id, status);

  if (!depoimento) {
    throw new ServiceError('NOT_FOUND', 'Testimonial not found', 404);
  }

  return depoimento;
}

/**
 * @summary
 * Adds a promotion.
 *
 * @function sorveteriaAddPromocao
 * @module services/sorveteria
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<Promocao>} The added promotion
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When sorveteria does not exist
 * @throws {ServiceError} LIMIT_EXCEEDED (400) - When promotion limit is reached
 * @throws {ServiceError} PRIORITY_CONFLICT (400) - When priority 1 already exists
 *
 * @example
 * const promocao = await sorveteriaAddPromocao({ titulo: 'Desconto', ... });
 * // Returns: { id: 1, titulo: 'Desconto', ativa: true, ... }
 */
export async function sorveteriaAddPromocao(body: unknown): Promise<Promocao> {
  const validation = promocaoCreateSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const sorveteria = sorveteriaStore.get();

  if (!sorveteria) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  if (sorveteria.promocoesAtivas.length >= SORVETERIA_LIMITS.MAX_PROMOCOES) {
    throw new ServiceError(
      'LIMIT_EXCEEDED',
      `Maximum of ${SORVETERIA_LIMITS.MAX_PROMOCOES} active promotions allowed`,
      400
    );
  }

  // Check if priority 1 already exists
  if (
    validation.data.prioridade === 1 &&
    sorveteria.promocoesAtivas.some((p) => p.prioridade === 1)
  ) {
    throw new ServiceError('PRIORITY_CONFLICT', 'Only one promotion can have priority 1', 400);
  }

  const promocao = sorveteriaStore.addPromocao(validation.data);

  if (!promocao) {
    throw new ServiceError('NOT_FOUND', 'Sorveteria not found', 404);
  }

  return promocao;
}

/**
 * @summary
 * Removes expired promotions (called by cron job).
 *
 * @function sorveteriaRemovePromocoesVencidas
 * @module services/sorveteria
 *
 * @returns {Promise<{ message: string; removed: number }>} Number of removed promotions
 *
 * @example
 * const result = await sorveteriaRemovePromocoesVencidas();
 * // Returns: { message: 'Expired promotions removed', removed: 2 }
 */
export async function sorveteriaRemovePromocoesVencidas(): Promise<{
  message: string;
  removed: number;
}> {
  const removed = sorveteriaStore.removePromocoesVencidas();

  return {
    message: 'Expired promotions removed',
    removed,
  };
}

/**
 * @summary
 * Updates operating status (called by cron job).
 *
 * @function sorveteriaUpdateStatus
 * @module services/sorveteria
 *
 * @returns {Promise<{ message: string; status: string }>} Current status
 *
 * @example
 * const result = await sorveteriaUpdateStatus();
 * // Returns: { message: 'Status updated', status: 'aberto' }
 */
export async function sorveteriaUpdateStatus(): Promise<{ message: string; status: string }> {
  sorveteriaStore.updateStatusFuncionamento();
  const sorveteria = sorveteriaStore.get();

  return {
    message: 'Status updated',
    status: sorveteria?.statusFuncionamento || 'unknown',
  };
}
