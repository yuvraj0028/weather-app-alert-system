import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Output } from '@angular/core';
import { SearchModel } from '../../model/SearchModel';
import { API } from '../../util/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  responseData: any;
  result: SearchModel[] = [];
  private _snackBar = inject(MatSnackBar);

  constructor(private httpClient: HttpClient) {}

  getLocations(location: string): SearchModel[] {
    try {
      this.httpClient
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API}`
        )
        .subscribe(
          (data) => {
            this.result = [];
            this.responseData = data;
            for (let i = 0; i < this.responseData.length; i++) {
              this.result.push(
                new SearchModel(
                  this.responseData[i].name,
                  this.responseData[i].lat,
                  this.responseData[i].lon,
                  this.responseData[i].state
                )
              );
            }
            return this.result;
          },
          (error) => {
            this._snackBar.open('ERROR : ' + error, 'Close');
          }
        );
    } catch (error) {
      this._snackBar.open('Error : ' + error, 'Close');
    }

    return this.result;
  }
}
