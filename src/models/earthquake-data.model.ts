export interface IEarthquakeData {
  time: Date;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  magType: string;
  id: number;
  place: string;
  type: string;
}
