import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { WeatherService } from '../../service/weather-service/weather.service';
import { WeatherData } from '../../model/weatherdata';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { metroCities } from '../../util/constants';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-metro-cities',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './metro-cities.component.html',
  styleUrls: ['./metro-cities.component.scss'],
})
export class MetroCitiesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() units!: string;
  _metroCities: WeatherData[] = [];
  updateInterval!: number;

  constructor(
    private weatherService: WeatherService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.startUpdateInterval();
  }

  ngOnChanges(): void {
    if (this.units) {
      this.initialize();
    }
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  initialize(): void {
    let cities = metroCities;
    let requests = cities.map((city) =>
      this.weatherService.getWeather(city.lat, city.lon, this.units)
    );

    this.spinner.show();
    forkJoin(requests).subscribe(
      (responses) => {
        this._metroCities = [];
        responses.forEach((data, index) => {
          let weatherData = new WeatherData(data);
          weatherData.name = cities[index].name;
          this._metroCities.push(weatherData);
        });
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  startUpdateInterval(): void {
    this.updateInterval = window.setInterval(() => {
      this.initialize();
    }, 300000);
  }
}
