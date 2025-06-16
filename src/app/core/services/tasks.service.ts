import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  getTasks(): Observable<any>{
    const url = `${this.apiBaseUrl}/v1/listTasks/`;
    return this.http.get(url)
  }
  
}
