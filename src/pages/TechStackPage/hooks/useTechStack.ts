import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { TechStack } from '../types';
import { useState } from 'react';

interface TechStackQueryParams {
  page: number;
  pageSize: number;
}

export function useTechStack(query: TechStackQueryParams): {
  techStackQuery: UseQueryResult<TechStack[], Error>;
  totalCount: number | null;
} {
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const fetchTechStack = async (): Promise<TechStack[]> => {
    const response = await axios.get<TechStack[]>('/techstack', {
      params: {
        _start: (query.page - 1) * query.pageSize,
        _limit: query.pageSize,
      },
    });
    const totalRecords = parseInt(response.headers['x-total-count'], 10);
    setTotalCount(totalRecords);
    return response.data;
  };

  const techStackQuery = useQuery<TechStack[], Error>({
    queryKey: ['techstack', query],
    queryFn: fetchTechStack,
  });

  return { techStackQuery, totalCount };
}
