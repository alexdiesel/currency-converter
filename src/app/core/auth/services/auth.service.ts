import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable, of, throwError} from 'rxjs';
import {API_BASE_URL} from '../../../shared/consts/api/base-url.const';

@Injectable({providedIn: 'root'})
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<{ token: string }> {
    // return this.http.post<{ token: string }>(`${API_BASE_URL}/auth/login`, {
    //   username,
    //   password,
    // });
    return of({token: btoa(`${username}:${password}`)}).pipe(delay(400));
    // return throwError(() => new Error(`Invalid username: ${username} or password`)).pipe(delay(800))
  }
}
