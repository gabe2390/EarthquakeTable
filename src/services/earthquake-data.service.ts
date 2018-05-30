import { IEarthquakeData } from '../models/earthquake-data.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EarthquakeDataService {
  earthquakeDataURL = 'http://interviewtest.getguru.com/seismic/data.json';
  constructor(private http: Http) { }

  public getEarthquakeData(): Promise<IEarthquakeData[]> {
    return this.http.get(this.earthquakeDataURL)
      .map(response => <IEarthquakeData[]>response.json()).toPromise();
  }
}
