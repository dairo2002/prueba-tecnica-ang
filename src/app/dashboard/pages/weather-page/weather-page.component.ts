import { Component, ChangeDetectorRef } from '@angular/core';
import { InfoCountryComponent } from "../../components/info-country/info-country.component";
import { WeatherComponent } from "../../components/weather/weather.component";
import { CountriesComponent } from "../../components/countries/countries.component";
import { TaskComponent } from "../../components/task/task.component";
import { TimezoneComponent } from "../../components/timezone/timezone.component";
import { HourZoneComponent } from "../../components/hour-zone/hour-zone.component";

import { WwatherService } from '../../../core/services/wwather.service';
import { TimezoneService } from '../../../core/services/timezone.service';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [InfoCountryComponent, WeatherComponent, CountriesComponent, TaskComponent, TimezoneComponent, HourZoneComponent],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.sass'
})
export class WeatherPageComponent {
  datosWeather: any = null;
  zonesCountry: any[] = [];
  selectedZone = '';

  constructor(
    private weatherService: WwatherService,
    private zonesService: TimezoneService,
    private cdr: ChangeDetectorRef
  ) { }
 

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('active');
  }

  // Selccion de países
  manejarSeleccion(country: any): void {
    this.weatherService.getWeatherInfo(country.nombre).subscribe({
      next: (data) => {
        this.datosWeather = data;
        // Cargar las zonas horarias
        this.zonesService.getZonesCountry(country.codigo).subscribe({
          next: (zones) => {
            this.zonesCountry = zones;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error', err);
          }
        });
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }


  manejarZonaSeleccionada(selected: { zone: string, city: string }): void {
    this.selectedZone = '';
    setTimeout(() => {
      this.selectedZone = selected.zone;
    }, 0);
  }
}
