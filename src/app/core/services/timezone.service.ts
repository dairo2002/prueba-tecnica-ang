import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl

  getZonesCountry(code: string): Observable<any[]>{
    const url = `${this.apiBaseUrl}/v1/zonesCountry/?code=${code}`
    return this.http.get<any[]>(url) 
  } 
  
  gethourZoneCountry(zone: string): Observable<any>{
    const url = `${this.apiBaseUrl}/v1/hourZone/?zone=${zone}`
    return this.http.get(url) 
  }



}
