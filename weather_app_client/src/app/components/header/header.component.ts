import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SearchService } from '../../service/search-service/search.service';
import { SearchModel } from '../../model/SearchModel';
import { MatDialog } from '@angular/material/dialog';
import { CreateAlertComponent } from '../create-alert/create-alert.component';
import { WeatherData } from '../../model/weatherdata';
import { WeatherService } from '../../service/weather-service/weather.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currUnit: string = 'C';
  searchQuery: string = '';
  selectedLocation!: SearchModel;
  filteredLocations: SearchModel[] = [];
  readonly dialog = inject(MatDialog);

  @Input() weatherData!: WeatherData;
  @Output() locationSelected = new EventEmitter<SearchModel>();
  @Output() unitChanged = new EventEmitter<string>();

  constructor(
    private SearchServiceService: SearchService,
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.unitChanged.emit(this.currUnit);
  }

  onSearch() {
    this.filteredLocations = [];
    if (this.searchQuery.trim() !== '') {
      this.spinner.show();
      this.filteredLocations = this.SearchServiceService.getLocations(
        this.searchQuery
      );
      this.spinner.hide();
    } else {
      this.filteredLocations = [];
    }
  }

  // Function to select a location from the dropdown
  selectLocation(location: SearchModel) {
    this.searchQuery = location.name + ', ' + location.state;
    this.selectedLocation = location;
    this.filteredLocations = [];
    this.locationSelected.emit(this.selectedLocation);
  }

  // toggle between celsius and kelvin
  toggleUnit() {
    if (this.currUnit === 'C') {
      this.currUnit = 'K';
      this.unitChanged.emit(this.currUnit);
    } else {
      this.currUnit = 'C';
      this.unitChanged.emit(this.currUnit);
    }
  }

  createAlert() {
    let name = '';

    if (this.weatherData) {
      name = this.weatherData.name;
    }

    const dialogRef = this.dialog.open(CreateAlertComponent, {
      data: name,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          city: this.weatherData.name,
          lat: this.weatherData.coord.lat,
          lon: this.weatherData.coord.lon,
          minTemp: result.minTemp,
          maxTemp: result.maxTemp,
          email: result.email,
          unit: result.units,
        };
        this.weatherService.createAlert(data);
      }
    });
  }
}
