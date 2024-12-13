import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface CategoryStore {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('CategoryStore', useCategoryStore);
}
