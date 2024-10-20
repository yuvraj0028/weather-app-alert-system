export class WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;

  constructor(data: any) {
    this.coord = data.coord;
    this.weather = data.weather.map((w: any) => new Weather(w));
    this.base = data.base;
    this.main = new Main(data.main);
    this.visibility = data.visibility;
    this.wind = new Wind(data.wind);
    if (data.rain) this.rain = new Rain(data.rain);
    this.clouds = new Clouds(data.clouds);
    this.dt = data.dt;
    this.sys = new Sys(data.sys);
    this.timezone = data.timezone;
    this.id = data.id;
    this.name = data.name;
    this.cod = data.cod;
  }
}

class Coord {
  lon: number;
  lat: number;

  constructor(coord: any) {
    this.lon = coord.lon;
    this.lat = coord.lat;
  }
}

class Weather {
  id: number;
  main: string;
  description: string;
  icon: string;

  constructor(weather: any) {
    this.id = weather.id;
    this.main = weather.main;
    this.description = weather.description;
    this.icon = weather.icon;
  }
}

class Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;

  constructor(main: any) {
    this.temp = main.temp;
    this.feels_like = main.feels_like;
    this.temp_min = main.temp_min;
    this.temp_max = main.temp_max;
    this.pressure = main.pressure;
    this.humidity = main.humidity;
    if (main.sea_level) this.sea_level = main.sea_level;
    if (main.grnd_level) this.grnd_level = main.grnd_level;
  }
}

class Wind {
  speed: number;
  deg: number;
  gust?: number;

  constructor(wind: any) {
    this.speed = wind.speed;
    this.deg = wind.deg;
    if (wind.gust) this.gust = wind.gust;
  }
}

class Rain {
  '1h': number;

  constructor(rain: any) {
    this['1h'] = rain['1h'];
  }
}

class Clouds {
  all: number;

  constructor(clouds: any) {
    this.all = clouds.all;
  }
}

class Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;

  constructor(sys: any) {
    this.type = sys.type;
    this.id = sys.id;
    this.country = sys.country;
    this.sunrise = sys.sunrise;
    this.sunset = sys.sunset;
  }
}
