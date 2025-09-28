export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
}

export interface SignInData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
}

export interface User {
  id: number;
  username: string;
  is_admin:number;
  email: string;
  avatar?: string;
}

export interface ProductQueryParams {
  page?: number;
  filter?: {
    price_from?: number;
    price_to?: number;
  };
  sort?: 'price' | '-price' | 'created_at'; 
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  release_year: string;
  cover_image: string;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ProductsResponse {
  data: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}


export interface Brand {
  id: number;
  name: string;
  image: string;
}

export interface ProductShow {
  id: number;
  name: string;
  description: string;
  price: number;
  release_year: string; 
  cover_image: string;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
  brand: Brand;
}