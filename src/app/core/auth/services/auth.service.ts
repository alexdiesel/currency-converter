import {inject, Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from 'rxjs';
import {RegForm} from '../models/reg-form.interface';
import {LoginForm} from '../models/login-form.interface';
import {User} from '../models/user.interface';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {USER} from '../const/localstorage-keys';

@Injectable({providedIn: 'root'})
export class AuthService {
  private localStorage = inject(LocalStorageService);

  reg({username, password, confirmPassword}: RegForm): Observable<User> {
    return of({username}).pipe(delay(400));
    // return throwError(() => new Error(`Username: ${username} already exists`)).pipe(delay(800))
  }

  login({username, password}: LoginForm): Observable<User> {
    return of({username, token: btoa(`${username}:${password}`)}).pipe(delay(400));
    // return throwError(() => new Error(`Invalid username: ${username} or password`)).pipe(delay(800))
  }

  saveUser(user: User): void {
    this.localStorage.set(USER, user);
  }

  removeUser(): void {
    this.localStorage.remove(USER);
  }

}
