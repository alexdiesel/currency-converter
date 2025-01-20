import {createReducer, on} from '@ngrx/store';
import {loginFailure, loginSuccess, logout} from './auth.actions';
import {AuthState} from '../models/auth-state.interface';

const initAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initAuthState,
  on(loginSuccess, (state, {token}) => ({
      ...state,
      isAuthenticated: true,
      token,
    })
  ),
  on(loginFailure, (state, {error}) => ({
      ...state,
      token: null,
      isAuthenticated: false,
      error,
    })
  ),
  on(logout, (state) => ({
      ...state,
      token: null,
      isAuthenticated: false,
    })
  ),
);
