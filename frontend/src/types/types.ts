type Listing = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  address: string;
  updated_at?: Date;
  created_at?: Date;
};

export type Page = {
  id: number;
  title: string;
  image?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
};

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export default Listing;
