import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TimezoneService } from '../../../core/services/timezone.service';

@Component({
  selector: 'app-hour-zone',
  standalone: true,
  imports: [],
  templateUrl: './hour-zone.component.html',
  styleUrl: './hour-zone.component.sass'
})
export class HourZoneComponent implements OnChanges {
  @Input() zona: any = '';
  @Input() ciudad: string = '';
  time = '';
  date = '';

  constructor(private timeService: TimezoneService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.zona) {
      this.timeService.gethourZoneCountry(this.zona).subscribe({
        next: (data) => {
          this.time = data.time;
          this.date = data.date;
        },
        error: (err) => {
          console.error('Error', err)
        }
      })
    }
  }

}
