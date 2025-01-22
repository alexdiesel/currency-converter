import {ActionReducer, INIT, UPDATE} from '@ngrx/store';
import {AuthState, User} from '../models/auth';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {USER} from '../const/localstorage-keys';

export function authMetaReducer(reducer: ActionReducer<{
    auth: AuthState
}>, localStorage: LocalStorageService): ActionReducer<{ auth: AuthState }> {

    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const user = localStorage.get(USER) as User;
            if (user) {
                const {username, secret, token} = user
                const auth = {
                    ...{username, secret, token},
                    isAuthenticated: !!token
                }
                return reducer(
                    {...state, auth: {...auth}},
                    action
                );
            }
        }
        return reducer(state, action);
    };
}
