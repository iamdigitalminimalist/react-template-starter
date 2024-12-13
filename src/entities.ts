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
