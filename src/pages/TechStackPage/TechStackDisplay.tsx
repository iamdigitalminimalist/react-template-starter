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

interface TechStackDisplayProps {
  selectedCategoryId: number | null;
}

export const TechStackDisplay = ({
  selectedCategoryId,
}: TechStackDisplayProps) => {
  const { data: techStack, isLoading, error } = useTechStack();

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 gap-6"
        role="progressbar"
        aria-label="Loading tech stack"
      >
        {[...Array(12)].map((_, idx) => (
          <Card key={idx} className="flex flex-col h-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="pt-6">
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
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
    <div className="grid grid-cols-2 gap-6">
      {visibleTechStack.map((library) => (
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
  );
};
