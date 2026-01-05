/**
 * @summary
 * Type definitions for useSorveteria hook.
 */

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Sorveteria } from '../../types/models';

export interface UseSorveteriaOptions
  extends Omit<UseQueryOptions<Sorveteria>, 'queryKey' | 'queryFn'> {}
