import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-country',
  standalone: true,
  imports: [],
  templateUrl: './info-country.component.html',
  styleUrl: './info-country.component.sass'
})
export class InfoCountryComponent {
  @Input() datos: any;
}
