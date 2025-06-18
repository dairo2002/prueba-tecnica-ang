import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface TimezoneData {
  zone: string;
  city: string;
}

@Component({
  selector: 'app-timezone',
  standalone: true,
  imports: [],
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.sass'
})
export class TimezoneComponent implements OnChanges {
  @Input() datos: TimezoneData[] = []; //zonas horarias  
  // @Output() zoneSelected = new EventEmitter<string>();
  @Output() zoneSelected = new EventEmitter<TimezoneData>();  
  selectedZone: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['datos'] && this.datos.length > 0){
      this.selectedZone = this.datos[0].zone;
      this.zoneSelected.emit(this.datos[0]);
    }
  }

  selectZone(timezoneData: TimezoneData): void {
    this.selectedZone = timezoneData.zone;
    this.zoneSelected.emit(timezoneData);
  }
}
