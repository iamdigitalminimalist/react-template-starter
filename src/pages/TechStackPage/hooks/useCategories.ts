import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Category } from '../types';

export default function useCategories(): UseQueryResult<Category[]> {
  const fetchCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>('/categories');

    return response.data;
  };

  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
