export class WeatherSummary {
  temp!: string;
  maxTemp!: string;
  minTemp!: string;
  humidity!: string;
  city!: string;
  condition!: string;

  constructor(
    temp: string,
    maxTemp: string,
    minTemp: string,
    humidity: string,
    city: string,
    condition: string
  ) {
    this.temp = temp;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.humidity = humidity;
    this.city = city;
    this.condition = condition;
  }
}
