import {createReducer, on} from '@ngrx/store';
import {loginFailure, loginSuccess, logout, regFailure, regSuccess} from './auth.actions';
import {AuthState} from '../models/auth-state.interface';

const initAuthState: AuthState = {
  isAuthenticated: false,
  username: null,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initAuthState,
  on(regSuccess, (state, {token, username}) => ({
      ...state,
      isAuthenticated: true,
      token,
      username,
    })
  ),
  on(regFailure, (state, {error}) => ({
      ...initAuthState,
      error
    })
  ),
  on(loginSuccess, (state, {token, username}) => ({
      ...state,
      isAuthenticated: true,
      token,
      username,
    })
  ),
  on(loginFailure, (state, {error}) => ({
      ...initAuthState,
      error,
    })
  ),
  on(logout, (state) => ({
      ...initAuthState,
    })
  ),
);
