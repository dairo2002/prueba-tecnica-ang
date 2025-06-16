import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-country.component.html',
  styleUrl: './info-country.component.sass'
})
export class InfoCountryComponent {
  @Input() datos: any;
}
