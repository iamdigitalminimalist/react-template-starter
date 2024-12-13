export type User = {
  id: number;
  name: string;
  isAdmin?: boolean;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type TechStack = {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  docsLink?: string;
};

export type Category = {
  id: number;
  name: string;
};
