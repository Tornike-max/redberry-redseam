export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
}