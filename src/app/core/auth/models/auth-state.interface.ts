export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}
