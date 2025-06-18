import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap} from 'rxjs';
import { LoginRequest } from '../models/auth';
import { SignupComponent } from '../../auth/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;
 
  Login(data: LoginRequest): Observable<any> {
    const url = `${this.apiBaseUrl}/v1/login/`;    
    return this.http.post(url, data).pipe(
      tap((response: any) => {
        if (response.success && response.token) {
          localStorage.setItem('access_token', response.token);          
        }
      })
    );
  }

  signup(data: SignupComponent): Observable<any> {
    const url = `${this.apiBaseUrl}/v1/signup/`
    return this.http.post(url, data)
  }
  
}
