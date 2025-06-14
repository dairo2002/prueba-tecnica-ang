import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-country.component.html',
  styleUrl: './select-country.component.sass'
})
export class SelectCountryComponent {
  @Input() datos: any;
}
