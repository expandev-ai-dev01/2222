/**
 * @summary
 * Custom hook for fetching sorveteria information.
 * Uses TanStack Query for server state management.
 *
 * @module domain/sorveteria/hooks/useSorveteria
 */

import { useQuery } from '@tanstack/react-query';
import { sorveteriaService } from '../../services/sorveteriaService';
import type { UseSorveteriaOptions } from './types';

export const useSorveteria = (options?: UseSorveteriaOptions) => {
  const queryKey = ['sorveteria'];

  const { data, ...queryInfo } = useQuery({
    queryKey,
    queryFn: () => sorveteriaService.get(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return { sorveteria: data, ...queryInfo };
};
