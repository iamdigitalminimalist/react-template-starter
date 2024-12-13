import { Category } from '@/entities';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface TechStack {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  docsLink?: string;
}

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
