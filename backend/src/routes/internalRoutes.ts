/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as sorveteriaController from '@/api/internal/sorveteria/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Sorveteria routes - /api/internal/sorveteria
 */
router.get('/sorveteria', sorveteriaController.getHandler);
router.post('/sorveteria', sorveteriaController.createOrUpdateHandler);
router.patch('/sorveteria', sorveteriaController.updateHandler);
router.post('/sorveteria/foto', sorveteriaController.addFotoHandler);
router.delete('/sorveteria/foto/:id', sorveteriaController.removeFotoHandler);
router.post('/sorveteria/depoimento', sorveteriaController.addDepoimentoHandler);
router.patch('/sorveteria/depoimento/:id', sorveteriaController.updateDepoimentoStatusHandler);
router.post('/sorveteria/promocao', sorveteriaController.addPromocaoHandler);
router.post(
  '/sorveteria/cron/remove-promocoes',
  sorveteriaController.removePromocoesVencidasHandler
);
router.post('/sorveteria/cron/update-status', sorveteriaController.updateStatusHandler);

export default router;
