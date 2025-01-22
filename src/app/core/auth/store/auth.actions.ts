import {createAction, props} from '@ngrx/store';
import {LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REG, REG_FAILURE, REG_SUCCESS} from './auth.actions.const';
import {RegForm} from '../models/reg';
import {LoginForm} from '../models/login';
import {User} from '../models/auth';

export const reg = createAction(
  REG,
  props<RegForm>()
);

export const regSuccess = createAction(
  REG_SUCCESS,
  props<User>()
);

export const regFailure = createAction(
  REG_FAILURE,
  props<{ error: string }>()
);

export const login = createAction(
  LOGIN,
  props<LoginForm>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<User>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGOUT);
