import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Observable, take} from 'rxjs';
import {AppState} from '../../../shared/models/app-state.interface';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private store = inject(Store);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.select((state: AppState) => state.auth.isAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
