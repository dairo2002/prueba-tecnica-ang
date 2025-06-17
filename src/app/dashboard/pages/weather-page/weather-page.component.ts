import { Component } from '@angular/core';
import { InfoCountryComponent } from "../../components/info-country/info-country.component";
import { WeatherComponent } from "../../components/weather/weather.component";
import { CountriesComponent } from "../../components/countries/countries.component";
import { TaskComponent } from "../../components/task/task.component";
import { TimezoneComponent } from "../../components/timezone/timezone.component";
import { HourZoneComponent } from "../../components/hour-zone/hour-zone.component";
import { CommonModule } from '@angular/common';
import { WwatherService } from '../../../core/services/wwather.service';
import { TimezoneService } from '../../../core/services/timezone.service';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [CommonModule, InfoCountryComponent, WeatherComponent, CountriesComponent, TaskComponent, TimezoneComponent, HourZoneComponent],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.sass'
})
export class WeatherPageComponent {
  datosWeather: any = null;
  zonesCountry: any[] = [];
  selectedZone = '';

  constructor(
    private weatherService: WwatherService,
    private zonesService: TimezoneService
  ) { }

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('active');
  }

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
