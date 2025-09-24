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