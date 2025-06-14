import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../models/auth';
import { Observable, tap } from 'rxjs';
import { response } from 'express';
import { url } from 'inspector';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TERMINAR 

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;
  // URLS
  // http://127.0.0.1:8000/api/v1/login/
  // http://127.0.0.1:8000/api/v1/signup/
  // http://127.0.0.1:8000/api/v1/logout/

  Login(data: LoginRequest): Observable<any> {
    const url = `${this.apiBaseUrl}/v1/login/`;
    return this.http.post(url, data).pipe(
      tap((response: any)=> {
        if (response.success && response.token){
          localStorage.setItem('access_token', response.token)
          console.log('Token Guard: ',response.token)
        }
      })
    )
  }  

   // Opcional: Métodos para obtener el token, verificar si está logueado, etc.
   getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    // También podrías redirigir al usuario a la página de login
  }




}
