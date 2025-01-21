import {createReducer, on} from '@ngrx/store';
import {loginFailure, loginSuccess, logout, regFailure, regSuccess} from './auth.actions';
import {AuthState} from '../models/auth-state.interface';

const initAuthState: AuthState = {
  isAuthenticated: false,
  username: null,
  secret: null,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initAuthState,
  on(regSuccess, (state, {secret, username}) => ({
      ...state,
      isAuthenticated: false,
      error: null,
      secret,
      username,
    })
  ),
  on(regFailure, (state, {error}) => ({
      ...state,
      error
    })
  ),
  on(loginSuccess, (state, {token}) => ({
      ...state,
      isAuthenticated: true,
      error: null,
      token,
    })
  ),
  on(loginFailure, (state, {error}) => ({
      ...state,
      error,
    })
  ),
  on(logout, (state) => ({
      ...state,
      isAuthenticated: false,
      token: null,
    })
  ),
);
