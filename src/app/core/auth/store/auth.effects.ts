import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {login, loginFailure, loginSuccess, reg, regFailure, regSuccess} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {LOGOUT} from './auth.actions.const';
import {of} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router)

  reg$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reg),
      switchMap(payload =>
        this.authService.reg(payload).pipe(
          map(user =>
            regSuccess(user)
          ),
          catchError((err) => of(
              loginFailure({error: err.message})
            )
          )
        )
      )
    )
  );

  regSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regSuccess),
        tap(({username, token}) => {
          this.authService.saveUser({username}); // TODO implement registration guard
          this.router.navigate(['/auth/login'])
        })
      ),
    {dispatch: false}
  );

  regFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(regFailure),
        tap(err => {
          console.error('Registration failure,', err)
        })
      ),
    {dispatch: false}
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(payload =>
        this.authService.login(payload).pipe(
          map(user =>
            loginSuccess(user)
          ),
          catchError(err => of(
              loginFailure({error: err.message})
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({username, token}) => {
          this.authService.saveUser({username, token});
          this.router.navigate(['/currency-converter'])
        })
      ),
    {dispatch: false}
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(err => {
          console.error('Login failure', err)
        })
      ),
    {dispatch: false}
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGOUT),
        tap(() => {
          this.authService.removeUser();
          this.router.navigate(['/auth/login'])
        })
      ),
    {dispatch: false}
  );
}
