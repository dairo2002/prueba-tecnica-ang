import { Component} from '@angular/core';
import { WwatherService } from '../core/services/wwather.service';
import { CountriesComponent } from "./countries/countries.component";
import { InfoCountryComponent } from "./info-country/info-country.component"
import { WeatherComponent } from "./weather/weather.component";
import { CommonModule } from '@angular/common';
import { TimezoneComponent } from "./timezone/timezone.component";
import { TimezoneService } from '../core/services/timezone.service';
import { HourZoneComponent } from "./hour-zone/hour-zone.component";
import { TaskComponent } from "./task/task.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CountriesComponent, InfoCountryComponent,  WeatherComponent, TimezoneComponent, HourZoneComponent, TaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  datosWeather: any = null;
  zonesCountry: any[] = [];
  selectedZone = '';

  constructor(
    private weatherService: WwatherService,
    private zonesService: TimezoneService
  ) { }

 
  manejarSeleccion(country: any): void {
    this.weatherService.getWeatherInfo(country.nombre).subscribe({
      next: (data) => {
        this.datosWeather = data;      
        // Cargar las zonas horarias
        this.zonesService.getZonesCountry(country.codigo).subscribe({
          next: (zones) => {
            this.zonesCountry = zones
          },
          error: (err) => {
            console.error('Error', err)
          }
        });
      },
      error: (err) => {
        console.error('Error', err)
      }
    });
  }

  manejarZonaSeleccionada(zone: string): void {
    this.selectedZone = zone;
  } 

}
