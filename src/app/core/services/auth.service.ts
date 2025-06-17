import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;
  // URLS
  // http://127.0.0.1:8000/api/v1/login/
  // http://127.0.0.1:8000/api/v1/signup/
  // http://127.0.0.1:8000/api/v1/logout/

  constructor() {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  Login(data: LoginRequest): Observable<any> {
    const url = `${this.apiBaseUrl}/v1/login/`;    
    return this.http.post(url, data).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          localStorage.setItem('access_token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticatedSubject.next(false);
    // También podrías redirigir al usuario a la página de login
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
