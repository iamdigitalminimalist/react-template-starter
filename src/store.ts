import { create } from 'zustand';

interface CategoryStore {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
