import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { TechStack } from '@/entities';

interface TechStackDisplayProps {
  selectedCategoryId: number | null;
}

export const TechStackDisplay = ({
  selectedCategoryId,
}: TechStackDisplayProps) => {
  const {
    data: techStack,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['techstack'],
    queryFn: async () => {
      const response = await axios.get<TechStack[]>('/techstack');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        role="progressbar"
        aria-label="Loading tech stack"
      >
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className="border rounded-lg shadow-sm p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-14 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load tech stack: {error.message}
      </p>
    );
  }

  if (!techStack || techStack.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tech stack found for the selected category
      </p>
    );
  }

  const visibleTechStack = selectedCategoryId
    ? techStack.filter((tech) =>
        tech.categories.some((category) => category.id === selectedCategoryId),
      )
    : techStack;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {visibleTechStack.map((library) => (
        <div
          key={library.id}
          className="flex flex-col gap-1 border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow text-left"
        >
          <h2 className="text-xl font-semibold">{library.name}</h2>
          <p className="text-gray-600">{library.description}</p>
        </div>
      ))}
    </div>
  );
};
