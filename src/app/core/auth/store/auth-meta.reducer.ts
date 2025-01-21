import {ActionReducer, INIT, UPDATE} from '@ngrx/store';
import {AuthState} from '../models/auth-state.interface';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {USER} from '../const/localstorage-keys';
import {User} from '../models/user.interface';

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
                console.log('authMetaReducer INIT', JSON.stringify(auth, null, 2));
                return reducer(
                    {...state, auth: {...auth}},
                    action
                );
            }
        }

        const nextState = reducer(state, action);
        console.log('authMetaReducer', JSON.stringify(nextState, null, 2));
        return nextState;
    };
}
