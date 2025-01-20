import {ActionReducerMap} from '@ngrx/store';
import {authReducer} from './auth.reducer';
import {AppState} from '../../../shared/models/app-state.interface';


export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
};
