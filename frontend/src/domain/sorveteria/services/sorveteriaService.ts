/**
 * @service SorveteriaService
 * @domain sorveteria
 * @type REST
 *
 * @summary
 * Service layer for Sorveteria entity.
 * Handles all API communication for ice cream shop information.
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Sorveteria } from '../types/models';

export const sorveteriaService = {
  /**
   * Get complete sorveteria information
   * @returns Promise<Sorveteria>
   */
  async get(): Promise<Sorveteria> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Sorveteria }>(
      '/sorveteria'
    );
    return data.data;
  },
};
