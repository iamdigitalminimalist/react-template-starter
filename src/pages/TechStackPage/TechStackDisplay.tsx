import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useTechStack } from './hooks/useTechStack';
import { useState } from 'react';
import { SkeletonLoader } from './SkeletonLoader';

interface TechStackDisplayProps {
  selectedCategoryId: number | null;
}

interface TechStackItem {
  id: number;
  name: string;
  description: string;
  docsLink?: string;
  categories: { id: number }[];
}

export const TechStackDisplay = ({
  selectedCategoryId,
}: TechStackDisplayProps): JSX.Element => {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const {
    techStackQuery: { data: techStack, isLoading, error, isPlaceholderData },
  } = useTechStack({ page, pageSize });

  const handleNextPage = (): void => {
    if (!isPlaceholderData && techStack?.length === pageSize) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handlePreviousPage = (): void => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        role="progressbar"
        aria-label="Loading tech stack"
      >
        <SkeletonLoader
          numSkeletons={4}
          renderSkeleton={(idx) => (
            <Card key={idx} className="flex flex-col h-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mt-12" />
              </CardHeader>
              <CardContent className="flex-grow mt-10">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter className="pt-6">
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          )}
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load tech stack: {(error as { message: string }).message}
      </p>
    );
  }

  if (!techStack) {
    return (
      <p className="text-center text-gray-500">
        No tech stack found for the selected category
      </p>
    );
  }
  const visibleTechStack = selectedCategoryId
    ? techStack.filter((tech: TechStackItem) =>
        tech.categories.some((category) => category.id === selectedCategoryId),
      )
    : techStack;

  return (
    <div className="flex flex-col gap-2">
      {visibleTechStack.length === 0 && (
        <p className="text-center text-gray-500">
          No tech stack found for the selected category
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {(visibleTechStack as TechStackItem[]).map((library) => (
          <Card key={library.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>
                <h2>{library.name}</h2>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                {library.description}
              </p>
            </CardContent>
            <CardFooter>
              {library.docsLink ? (
                <Button variant="outline" asChild className="w-full">
                  <a
                    href={library.docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Docs <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No documentation available
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePreviousPage}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={isPlaceholderData || techStack.length < pageSize}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
