import {createAction, props} from '@ngrx/store';
import {LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from './auth.actions.const';

export const login = createAction(
  LOGIN,
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ token: string }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGOUT);
