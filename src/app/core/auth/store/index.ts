import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {authReducer} from './auth.reducer';
import {AppState} from '../../../shared/models/app-state.interface';
import {authMetaReducer} from './auth-meta.reducer';
import {LocalStorageService} from '../../../shared/services/local-storage.service';


export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer[] = [
  (reducer) => authMetaReducer(reducer, new LocalStorageService())
];
