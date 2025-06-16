import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserResponse } from '../models/user';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  getUsers(): Observable<UserResponse[]> {
    const url = `${this.apiBaseUrl}/v1/listUsers/`;
    return this.http.get<UserResponse[]>(url)
  }

}
