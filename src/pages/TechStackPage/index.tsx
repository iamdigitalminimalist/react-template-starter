import { useState } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { TechStackDisplay } from './TechStackDisplay';
import { TechStackDialogForm } from './TechStackDialogForm';

export default function TechStackPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Tech Stack</h1>
        <TechStackDialogForm />
      </div>
      <CategoryFilter
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <TechStackDisplay selectedCategoryId={selectedCategoryId} />
    </div>
  );
}
