import {User} from './user.interface';

export interface AuthState extends User {
  isAuthenticated: boolean;
  error?: string | null;
}
