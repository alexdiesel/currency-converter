import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {AppState} from '../../../shared/models/app-state.interface';


@Injectable({providedIn: 'root'})
export class CurrencyConverterGuard implements CanActivate {

  private store = inject(Store);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.select((state: AppState) => state.auth.isAuthenticated).pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
