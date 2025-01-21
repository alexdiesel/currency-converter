import {createSelector} from '@ngrx/store';
import {AppState} from '../../../shared/models/app-state.interface';

export const selectAuthState = (state: AppState) => state.auth;

export const selectUsername = createSelector(
  selectAuthState,
  (state) => state.username
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error);
