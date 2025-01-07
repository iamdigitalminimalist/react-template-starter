import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useCategories from './hooks/useCategories';
import { SkeletonLoader } from './SkeletonLoader';

interface CategoryFilterProps {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (category: number | null) => void;
}

export function CategoryFilter({
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryFilterProps): JSX.Element | null {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div
        className="mt-4 flex flex-wrap gap-x-2"
        role="progressbar"
        aria-label="Loading categories"
      >
        <SkeletonLoader
          numSkeletons={10}
          renderSkeleton={(idx) => (
            <div key={idx} className="p-1">
              <Skeleton className="h-6 w-24" />
            </div>
          )}
        />
      </div>
    );
  }

  if (error) return null;

  if (categories?.length === 0) {
    return (
      <p className="text-center text-gray-500">No categories available.</p>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-x-4">
      {categories?.map((category) => (
        <Button
          variant="ghost"
          size="sm"
          key={category.id}
          className="p-0"
          onClick={() =>
            setSelectedCategoryId(
              selectedCategoryId === category.id ? null : category.id,
            )
          }
        >
          <Badge
            variant="outline"
            className={`m-0 ${
              selectedCategoryId === category.id ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            {category.name}
          </Badge>
        </Button>
      ))}
    </div>
  );
}
