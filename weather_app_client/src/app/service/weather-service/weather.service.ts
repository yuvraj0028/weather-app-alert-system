import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WeatherData } from '../../model/weatherdata';
import { API } from '../../util/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _snackBar = inject(MatSnackBar);

  constructor(private httpClient: HttpClient) {}

  getWeather(lat: number, lon: number, unit: string): Observable<WeatherData> {
    if (unit === 'C') {
      unit = 'metric';
    } else {
      unit = 'imperial';
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=${unit}`;
    return this.httpClient.get(url).pipe(
      map((data) => new WeatherData(data)),
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }

  createAlert(data: any) {
    try {
      this.httpClient
        .post('http://localhost:9192/application/api/alert/create', data)
        .subscribe(
          (response) => {
            // show snack bar
            this._snackBar.open('Alert created successfully', 'Close');
            console.log(response);
          },
          (error) => {
            this._snackBar.open(error.error.text, 'Close');

            console.log(error);
          }
        );
    } catch (error) {
      this._snackBar.open('Error : ' + error, 'Close');
      console.log(error);
    }
  }

  triggerAlert(data: string) {
    try {
      this.httpClient
        .post('http://localhost:9192/application/api/alert/trigger', {
          email: data,
        })
        .subscribe(
          (response) => {
            // show snack bar
            this._snackBar.open('Response' + response, 'Close');
            console.log(response);
          },
          (error) => {
            this._snackBar.open(error.error.text, 'Close');
            console.log(error);
          }
        );
    } catch (error) {
      this._snackBar.open('Error : ' + error, 'Close');
      console.log(error);
    }
  }
}
