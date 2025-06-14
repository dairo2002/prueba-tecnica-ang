import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WwatherService } from '../core/services/wwather.service';
import { CountriesComponent } from "./countries/countries.component";
import { SelectCountryComponent } from './select-country/select-country.component';
import { WeatherComponent } from "./weather/weather.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CountriesComponent, SelectCountryComponent, WeatherComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  datosWeather: any = null;
  loading = true;

  constructor(private weatherService: WwatherService) { }

  // ngOnInit(): void {
    // this.manejarSeleccion();
  // }

  manejarSeleccion(country: any): void {
    this.weatherService.getWeatherInfo(country.nombre).subscribe({
      next: (data) => {
        this.datosWeather = data;
      },
      error: (err) => {
        console.error('Error', err)
      }
    });
  }
}
