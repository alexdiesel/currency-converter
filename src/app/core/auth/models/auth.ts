export interface User {
  username?: string | null;
  secret?: string | null;
  token?: string | null;
}

export interface AuthState extends User {
  isAuthenticated: boolean;
  error?: string | null;
}
