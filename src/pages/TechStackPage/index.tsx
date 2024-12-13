import { CategoryFilter } from './CategoryFilter';
import { TechStackDisplay } from './TechStackDisplay';
import { TechStackDialogForm } from './TechStackDialogForm';
import { useCategoryStore } from '@/store';

export default function TechStackPage() {
  const { selectedCategoryId, setSelectedCategoryId } = useCategoryStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="m-0">Tech Stack</h1>
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
