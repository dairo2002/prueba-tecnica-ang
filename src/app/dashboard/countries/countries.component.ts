import { Component, EventEmitter, Output } from '@angular/core';
import { WwatherService } from '../../core/services/wwather.service';

@Component({
  selector: 'app-countries',
  imports: [],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.sass'
})
export class CountriesComponent {
  countries: any[] = [];
  selectedCountry: any = null;

  constructor(private weatherService: WwatherService) { }

  @Output() countrySelected = new EventEmitter<any>();

  ngOnInit(): void {
    this.listCountries();
  }

  private listCountries(): void {
    this.weatherService.getListCountries().subscribe({
      next: (data) => {
        this.countries = data;
        if(data.length > 0) {
          // Muestra el primer pais
          this.selectCountry(data[0]); 
        }
      },
      error: (err) => {
        console.error('Error', err)
      }
    })
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.countrySelected.emit(country);            
  }

}
