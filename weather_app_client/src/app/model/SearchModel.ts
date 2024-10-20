export class SearchModel {
  name!: string;
  state!: string;
  lat!: number;
  lon!: number;

  constructor(name: string, lat: number, lon: number, state: string) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.state = state;
  }
}
