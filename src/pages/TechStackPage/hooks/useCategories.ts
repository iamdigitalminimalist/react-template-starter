import { Category } from '@/entities';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCategories() {
  const fetchCategories = async () => {
    const response = await axios.get<Category[]>('/categories');
    return response.data;
  };

  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
