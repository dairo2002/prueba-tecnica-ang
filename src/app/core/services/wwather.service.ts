import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { request } from 'http';

@Injectable({
  providedIn: 'root'
})
export class WwatherService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl
  private apiKey = environment.weatherApiKey;
  private baseUrl = environment.weatherBaseUrl;
    
  getListCountries(): Observable<any[]> {
    const url = `${this.apiBaseUrl}/v1/listCountries/`;
    return this.http.get<any[]>(url)
  }
 
  getWeatherInfo(country: string): Observable<any> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${country}`;
    return this.http.get(url);
  }

}
