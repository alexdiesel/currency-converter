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

  reg({username, password}: RegForm): Observable<User> {
    const existingUser = this.localStorage.get(USER) as User;
    return existingUser?.username !== username
      ? of({username, secret: btoa(`${username}:${password}`)}).pipe(delay(200))
      : throwError(() => new Error(`Username: ${username} already exists`)).pipe(delay(800))
  }

  login({username, password}: LoginForm): Observable<User> {
    const existingUser = this.localStorage.get(USER) as User;
    if (!existingUser) {
      return throwError(() => new Error(`Your should register first`)).pipe(delay(800))
    }
    const secret = btoa(`${username}:${password}`);
    return existingUser.secret === secret
      ? of({token: btoa(`${secret}:${existingUser.secret}`)}).pipe(delay(400))
      : throwError(() => new Error(`Invalid username: ${username} or password`)).pipe(delay(800))
  }

  saveUser(user: User): void {
    this.localStorage.set(USER, user);
  }

  saveToken(token: string): void {
    const user = this.localStorage.get(USER) as User;
    this.localStorage.set(USER, {...user, token});
  }

  logOutUser(): void {
    const {token, ...user} = this.localStorage.get(USER) as User;
    this.localStorage.set(USER, user);
  }

}
