import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherSummary } from '../../model/WeatherSummary';

@Component({
  selector: 'app-daily-summery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-summery.component.html',
  styleUrl: './daily-summery.component.scss',
})
export class DailySummeryComponent {
  @Input() weatherSummary!: WeatherSummary;
}
