import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TriggerAlertComponent } from '../trigger-alert/trigger-alert.component';
import { WeatherService } from '../../service/weather-service/weather.service';

@Component({
  selector: 'app-user-alerts',
  standalone: true,
  imports: [],
  templateUrl: './user-alerts.component.html',
  styleUrl: './user-alerts.component.scss',
})
export class UserAlertsComponent {
  readonly dialog = inject(MatDialog);

  constructor(private WeatherService: WeatherService) {}

  // Method to load alerts
  triggerAlerts() {
    const dialogRef = this.dialog.open(TriggerAlertComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.WeatherService.triggerAlert(result.email);
      }
    });
  }
}
