import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {AppState} from '../models/app-state.interface';
import {tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select((state: AppState) => state.auth.isAuthenticated).pipe(
      tap(isAuthenticated => {
        const isAuthRoute = state.url.startsWith('/auth');
        if (isAuthenticated && isAuthRoute) {
          this.router.navigate(['/currency-converter']);
        } else if (!isAuthenticated && !isAuthRoute) {
          this.router.navigate(['/auth/login']);
        }
      }),
      map(isAuthenticated => {
        const isAuthRoute = state.url.startsWith('/auth');
        return isAuthenticated || isAuthRoute;
      })
    );
  }
}
