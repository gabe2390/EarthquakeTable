import { EarthquakeDataService } from './../services/earthquake-data.service';
import { IEarthquakeData } from './../models/earthquake-data.model';
import { Component, Input, OnInit } from '@angular/core';
import { IEarthquakeDisplay } from 'components/earthquake-display/earthquake-display.component';

@Component({
  selector: 'guru-app-root',
  template: `
    <div *ngIf="restCallStatus === 'Success'">
      <filter-display-data></filter-display-data>
      <earthquake-display [earthquakeData]="earthquakeData"></earthquake-display>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class GuruAppComponent implements OnInit {
  restCallStatus: RestCallStatus;
  earthquakeData: IEarthquakeData[];
  filterText: string;

  constructor(private earthquakeDataService: EarthquakeDataService) { }

  ngOnInit(): void {
    this.restCallStatus = 'Loading';
    this.earthquakeDataService.getEarthquakeData().then(response => {
      this.earthquakeData = response;
      this.restCallStatus = 'Success';
    }).catch(() => {
      this.earthquakeData = [];
      this.restCallStatus = 'Error';
    });
  }
}

export type RestCallStatus = 'Success' | 'Loading' | 'Error';
