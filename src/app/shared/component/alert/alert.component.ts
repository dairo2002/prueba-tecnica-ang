import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.sass'
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Input() show: boolean = false;

  getIconClass(): string {
    switch (this.type) {
      case 'success':
        return 'fa-solid fa-check';
      case 'error':
        return 'fa-solid fa-xmark';
      case 'warning':
        return 'fa-solid fa-exclamation-triangle';
      case 'info':
        return 'fa-solid fa-info';
      default:
        return 'fa-solid fa-check';
    }
  }

  getAlertClass(): string {
    return `alert-card ${this.type}`;
  }
}
