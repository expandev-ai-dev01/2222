/**
 * @summary
 * API controller for Sorveteria entity.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/sorveteria/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  sorveteriaGet,
  sorveteriaCreateOrUpdate,
  sorveteriaUpdate,
  sorveteriaAddFoto,
  sorveteriaRemoveFoto,
  sorveteriaAddDepoimento,
  sorveteriaUpdateDepoimentoStatus,
  sorveteriaAddPromocao,
  sorveteriaRemovePromocoesVencidas,
  sorveteriaUpdateStatus,
} from '@/services/sorveteria';

/**
 * @api {get} /api/internal/sorveteria Get Sorveteria Information
 * @apiName GetSorveteria
 * @apiGroup Sorveteria
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.nomeSorveteria Ice cream shop name
 * @apiSuccess {String} data.logotipo Logo URL
 * @apiSuccess {String|null} data.slogan Slogan
 * @apiSuccess {String} data.historiaSorveteria History text
 * @apiSuccess {Number} data.anoFundacao Foundation year
 * @apiSuccess {String[]} data.diferenciais List of differentials
 * @apiSuccess {String} data.fundadores Founders information
 * @apiSuccess {Object} data.horariosSemana Weekly operating hours
 * @apiSuccess {Object[]} data.horariosEspeciais Special operating hours
 * @apiSuccess {String} data.statusFuncionamento Current status (aberto | fechado | abrindo_em_breve)
 * @apiSuccess {Object[]} data.fotosAmbiente Environment photos
 * @apiSuccess {Object[]} data.depoimentos Testimonials (only approved)
 * @apiSuccess {Number|null} data.avaliacaoMedia Average rating
 * @apiSuccess {Number} data.totalAvaliacoes Total number of ratings
 * @apiSuccess {Object[]} data.promocoesAtivas Active promotions
 * @apiSuccess {String|null} data.missao Mission statement
 * @apiSuccess {String|null} data.visao Vision statement
 * @apiSuccess {String[]} data.valores Values list
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await sorveteriaGet();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/sorveteria Create or Update Sorveteria Information
 * @apiName CreateOrUpdateSorveteria
 * @apiGroup Sorveteria
 *
 * @apiBody {String} nomeSorveteria Ice cream shop name (1-200 chars)
 * @apiBody {String} logotipo Logo URL
 * @apiBody {String} [slogan] Slogan (max 50 chars)
 * @apiBody {String} historiaSorveteria History text (200-800 chars)
 * @apiBody {Number} anoFundacao Foundation year (1900-current)
 * @apiBody {String[]} diferenciais List of differentials (3-6 items, max 100 chars each)
 * @apiBody {String} fundadores Founders information (max 200 chars)
 * @apiBody {Object} horariosSemana Weekly operating hours
 * @apiBody {Object[]} [horariosEspeciais] Special operating hours
 * @apiBody {String} [missao] Mission statement (max 200 chars)
 * @apiBody {String} [visao] Vision statement (max 200 chars)
 * @apiBody {String[]} [valores] Values list (max 5 items, max 50 chars each)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Created/updated sorveteria information
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function createOrUpdateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaCreateOrUpdate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {patch} /api/internal/sorveteria Update Sorveteria Information
 * @apiName UpdateSorveteria
 * @apiGroup Sorveteria
 *
 * @apiBody {String} [nomeSorveteria] Ice cream shop name (1-200 chars)
 * @apiBody {String} [logotipo] Logo URL
 * @apiBody {String} [slogan] Slogan (max 50 chars)
 * @apiBody {String} [historiaSorveteria] History text (200-800 chars)
 * @apiBody {Number} [anoFundacao] Foundation year (1900-current)
 * @apiBody {String[]} [diferenciais] List of differentials (3-6 items, max 100 chars each)
 * @apiBody {String} [fundadores] Founders information (max 200 chars)
 * @apiBody {Object} [horariosSemana] Weekly operating hours
 * @apiBody {Object[]} [horariosEspeciais] Special operating hours
 * @apiBody {String} [missao] Mission statement (max 200 chars)
 * @apiBody {String} [visao] Vision statement (max 200 chars)
 * @apiBody {String[]} [valores] Values list (max 5 items, max 50 chars each)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Updated sorveteria information
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaUpdate(req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/sorveteria/foto Add Environment Photo
 * @apiName AddFoto
 * @apiGroup Sorveteria
 *
 * @apiBody {String} url Photo URL
 * @apiBody {String} [descricao] Photo description (max 150 chars)
 * @apiBody {String} categoria Photo category (balcao | atendimento | externo | geral)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Photo ID
 * @apiSuccess {String} data.url Photo URL
 * @apiSuccess {String|null} data.descricao Photo description
 * @apiSuccess {String} data.categoria Photo category
 * @apiSuccess {Number} data.ordem Display order
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND | LIMIT_EXCEEDED)
 * @apiError {String} error.message Error message
 */
export async function addFotoHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaAddFoto(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/sorveteria/foto/:id Remove Environment Photo
 * @apiName RemoveFoto
 * @apiGroup Sorveteria
 *
 * @apiParam {Number} id Photo ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function removeFotoHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaRemoveFoto(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/sorveteria/depoimento Add Testimonial
 * @apiName AddDepoimento
 * @apiGroup Sorveteria
 *
 * @apiBody {String} nomeCliente Customer name (1-100 chars)
 * @apiBody {String} texto Testimonial text (1-300 chars)
 * @apiBody {Number} avaliacao Rating (1-5)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Testimonial ID
 * @apiSuccess {String} data.nomeCliente Customer name
 * @apiSuccess {String} data.texto Testimonial text
 * @apiSuccess {Number} data.avaliacao Rating
 * @apiSuccess {String} data.statusModeracao Moderation status (pendente)
 * @apiSuccess {String} data.dataCriacao ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function addDepoimentoHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaAddDepoimento(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {patch} /api/internal/sorveteria/depoimento/:id Update Testimonial Status
 * @apiName UpdateDepoimentoStatus
 * @apiGroup Sorveteria
 *
 * @apiParam {Number} id Testimonial ID
 *
 * @apiBody {String} status Moderation status (pendente | aprovado | rejeitado)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object} data Updated testimonial
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function updateDepoimentoStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaUpdateDepoimentoStatus(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/sorveteria/promocao Add Promotion
 * @apiName AddPromocao
 * @apiGroup Sorveteria
 *
 * @apiBody {String} titulo Promotion title (1-200 chars)
 * @apiBody {String} descricao Promotion description (1-500 chars)
 * @apiBody {String} dataValidade Expiration date (YYYY-MM-DD)
 * @apiBody {Number} prioridade Priority (1-5)
 * @apiBody {String} tipo Promotion type (desconto | combo | brinde | especial)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Promotion ID
 * @apiSuccess {String} data.titulo Promotion title
 * @apiSuccess {String} data.descricao Promotion description
 * @apiSuccess {String} data.dataValidade Expiration date
 * @apiSuccess {Number} data.prioridade Priority
 * @apiSuccess {String} data.tipo Promotion type
 * @apiSuccess {Boolean} data.ativa Active status
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND | LIMIT_EXCEEDED | PRIORITY_CONFLICT)
 * @apiError {String} error.message Error message
 */
export async function addPromocaoHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaAddPromocao(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/sorveteria/cron/remove-promocoes Remove Expired Promotions
 * @apiName RemovePromocoesVencidas
 * @apiGroup Sorveteria
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 * @apiSuccess {Number} data.removed Number of removed promotions
 */
export async function removePromocoesVencidasHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaRemovePromocoesVencidas();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/sorveteria/cron/update-status Update Operating Status
 * @apiName UpdateStatus
 * @apiGroup Sorveteria
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 * @apiSuccess {String} data.status Current status
 */
export async function updateStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await sorveteriaUpdateStatus();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
