import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { UserAlertsComponent } from '../user-alerts/user-alerts.component';
import { WeatherData } from '../../model/weatherdata';
import { WeatherService } from '../../service/weather-service/weather.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SearchModel } from '../../model/SearchModel';
import { CommonModule } from '@angular/common';
import { WeatherSummary } from '../../model/WeatherSummary';

@Component({
  selector: 'app-user-location',
  standalone: true,
  imports: [UserAlertsComponent, CommonModule, NgxSpinnerModule],
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
})
export class UserLocationComponent implements OnInit, OnChanges {
  @Input() units!: string;
  @Input() searchData!: SearchModel;
  @Output() weatherSummary = new EventEmitter<WeatherSummary>();
  @Output() weatherData = new EventEmitter<WeatherData>();
  userCurrentLocation!: WeatherData;
  dateTime!: string;

  constructor(
    private weatherService: WeatherService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.initializeData(latitude, longitude);
      });
    }
    this.startInterval();
  }

  ngOnChanges(changes: any): void {
    if (this.searchData) {
      this.initializeData(this.searchData.lat, this.searchData.lon);
    }

    if (
      this.units !== changes['units'].previousValue &&
      this.userCurrentLocation
    ) {
      this.initializeData(
        this.userCurrentLocation.coord.lat,
        this.userCurrentLocation.coord.lon
      );
    }
  }

  initializeData(lat: number, lon: number): void {
    this.spinner.show();
    this.weatherService.getWeather(lat, lon, this.units).subscribe(
      (data) => {
        this.userCurrentLocation = data;
        this.updateDateTime(data.dt);
        let weatherSummary = new WeatherSummary(
          data.main.temp + ' °' + this.units,
          data.main.temp_max + ' °' + this.units,
          data.main.temp_min + ' °' + this.units,
          data.main.humidity + '',
          data.name,
          data.weather[0].main
        );
        this.weatherSummary.emit(weatherSummary);
        this.weatherData.emit(data);
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.spinner.hide();
      }
    );
  }

  updateDateTime(timestamp: number): void {
    const date = new Date(timestamp * 1000);
    this.dateTime = date.toLocaleString();
    const index = this.dateTime.lastIndexOf(':') + 3;
    this.dateTime = `${this.dateTime.slice(0, index)} ${this.dateTime.slice(
      index
    )}`;
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.initializeData(latitude, longitude);
      });
    }
  }

  startInterval(): void {
    setInterval(() => {
      if (this.userCurrentLocation) {
        const { lat, lon } = this.userCurrentLocation.coord;
        this.initializeData(lat, lon);
      }
    }, 300000);
  }
}
