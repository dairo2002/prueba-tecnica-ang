import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timezone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.sass'
})
export class TimezoneComponent implements OnChanges {
  @Input() datos: any; //zonas horarias  
  @Output() zoneSelected = new EventEmitter<any>();
  selectedZone: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['datos'] && this.datos.length > 0){
    //   this.selectZone = this.datos[0];
    //   this.zoneSelected.emit(this.selectZone)
    // }
  }

  selectZone(zone: string): void {
    this.zoneSelected.emit(zone)
  }

}
