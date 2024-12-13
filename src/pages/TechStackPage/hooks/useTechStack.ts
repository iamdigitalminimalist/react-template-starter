import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TechStack } from '../types';

export function useTechStack() {
  const fetchTechStack = async () => {
    const response = await axios.get<TechStack[]>('/techstack');
    return response.data;
  };

  return useQuery<TechStack[], Error>({
    queryKey: ['techstack'],
    queryFn: fetchTechStack,
  });
}
