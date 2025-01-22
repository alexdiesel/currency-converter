import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {authReducer} from '../../core/auth/store/auth.reducer';
import {AppState} from '../models/app-state.interface';
import {authMetaReducer} from '../../core/auth/store/auth-meta.reducer';
import {LocalStorageService} from '../services/local-storage.service';


export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer[] = [
  (reducer) => authMetaReducer(reducer, new LocalStorageService())
];
