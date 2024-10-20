import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserLocationComponent } from '../user-location/user-location.component';
import { MetroCitiesComponent } from '../metro-cities/metro-cities.component';
import { DailySummeryComponent } from '../daily-summery/daily-summery.component';
import { UserAlertsComponent } from '../user-alerts/user-alerts.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchModel } from '../../model/SearchModel';
import { WeatherSummary } from '../../model/WeatherSummary';
import { WeatherData } from '../../model/weatherdata';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    UserLocationComponent,
    MetroCitiesComponent,
    DailySummeryComponent,
    UserAlertsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  unit!: string;
  searchedLocation!: SearchModel;
  weatherSummary!: WeatherSummary;
  weatherData!: WeatherData;

  selectLocation(location: SearchModel) {
    this.searchedLocation = location;
  }

  getWeatherSummary($event: WeatherSummary) {
    this.weatherSummary = $event;
  }

  toggleUnit($event: string) {
    if ($event === null || $event === 'C') {
      this.unit = 'C';
    } else {
      this.unit = 'K';
    }
  }

  getWeather($event: WeatherData) {
    this.weatherData = $event;
  }
}
