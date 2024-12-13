import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Category } from '../types';

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
