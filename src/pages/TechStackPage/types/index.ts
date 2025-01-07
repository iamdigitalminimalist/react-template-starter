export interface Category {
  id: number;
  name: string;
}

export interface TechStack {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  docsLink?: string;
}
