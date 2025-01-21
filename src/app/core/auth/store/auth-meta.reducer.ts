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
                const auth = {
                    username: user.username,
                    token: user.token,
                    isAuthenticated: true
                }
                return reducer(
                    {...state, auth: {...auth}},
                    action
                );
            }
        }

        const nextState = reducer(state, action);
        if (nextState?.auth.token !== state?.auth.token) {
            if (nextState.auth.token) {
                const {token, username} = nextState.auth;
                localStorage.set(USER, {token, username});
            } else {
                localStorage.remove(USER);
            }
        }

        return nextState;
    };
}
