import { CategoryFilter } from '@/components/excluded/CategoryFilter';
import { TechStackDisplay } from '@/components/excluded/TechStackDisplay';
import { Category, TechStack } from '@/entities';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function TechStackPage() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get<Category[]>('/categories');
      return response.data;
    },
  });

  const {
    data: techStack,
    isLoading: techStackLoading,
    error: techStackError,
  } = useQuery({
    queryKey: ['techstack'],
    queryFn: async () => {
      const response = await axios.get<TechStack[]>('/techstack');
      return response.data;
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTechStack = selectedCategory
    ? techStack?.filter((tech) =>
        tech.categories.some((category) => category.name === selectedCategory),
      )
    : techStack;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Tech Stack</h1>

      <CategoryFilter
        isLoading={categoriesLoading}
        error={categoriesError}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TechStackDisplay
        isLoading={techStackLoading}
        error={techStackError}
        techStack={filteredTechStack}
      />
    </div>
  );
}
