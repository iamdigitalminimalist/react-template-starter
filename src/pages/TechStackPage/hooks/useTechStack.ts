import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TechStack } from '../types';

interface TechStackQueryParams {
  page: number;
  pageSize: number;
}

export function useTechStack(query: TechStackQueryParams) {
  const fetchTechStack = async () => {
    const response = await axios.get<TechStack[]>('/techstack', {
      params: {
        _start: (query.page - 1) * query.pageSize,
        _limit: query.pageSize,
      },
    });
    return response.data;
  };

  return useQuery<TechStack[], Error>({
    queryKey: ['techstack', query],
    queryFn: fetchTechStack,
  });
}
