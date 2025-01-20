import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {login, loginFailure, loginSuccess} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {LOGOUT} from './auth.actions.const';
import {of} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({username, password}) =>
        this.authService.login(username, password).pipe(
          map(({token}) =>
            loginSuccess({token})),
          catchError((err) => of(
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
        tap((result) => {
          console.log('ofType(loginSuccess)', result)
          this.router.navigate(['/currency-converter'])
        })
      ),
    {dispatch: false}
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap((err) => {
          console.error('ofType(loginFailure),', err)
        })
      ),
    {dispatch: false}
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGOUT),
        tap(() => this.router.navigate(['/login']))
      ),
    {dispatch: false}
  );
}
