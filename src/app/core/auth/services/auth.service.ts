import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable, of, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<{ token: string }> {
    // return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, {
    //   username,
    //   password,
    // });
    return of({token: btoa(`${username}:${password}`)}).pipe(delay(400));
    // return throwError(() => new Error(`Invalid username: ${username} or password`)).pipe(delay(800))
  }
}
