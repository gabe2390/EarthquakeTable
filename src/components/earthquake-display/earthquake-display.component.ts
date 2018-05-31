import { IEarthquakeData } from './../../models/earthquake-data.model';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { EarthquakeFilterService } from 'services/earthquake-filter.service';

@Component({
  selector: 'earthquake-display',
  template: `
    <div *ngIf="earthquakeData" class="earthquake-table-container">
      <h2 *ngIf="filteredEarthquakes.length <= 0">No Results Available</h2>
      <table class="earthquake-table" *ngIf="filteredEarthquakes.length > 0">
        <tr class="earthquake-table-row">
          <th class=" cell header">ID</th>
          <th class="header cell">Time</th>
          <th class="header cell">Location</th>
          <th class="header cell">Magnitude</th>
          <th class="header cell">Details</th>
        </tr>
        <tr *ngFor="let earthquake of filteredEarthquakes" class="earthquake-table-row">
          <td class="cell">{{earthquake.earthquake.id}}</td>
          <td class="cell">{{earthquake.earthquake.time | date:'fullDate'}}</td>
          <td class="cell">{{earthquake.earthquake.place}}</td>
          <td class="cell" >{{earthquake.earthquake.mag}}</td>
          <td class="cell details">
            <button class="details-button" *ngIf="!earthquake.showDetails" (click)="toggleDetails(earthquake)">Details</button>
            <div class="details-container" *ngIf="earthquake.showDetails"  (click)="toggleDetails(earthquake)">
              <span class="details">Lat: {{earthquake.earthquake.latitude}}, Lng: {{earthquake.earthquake.longitude}}</span>
            </div>
          </td>
        </tr>
    </table>
    </div>
  `,
  styleUrls: ['./earthquake-display.component.css']
})
export class EarthquakeDisplayComponent implements OnInit {
  @Input() earthquakeData: IEarthquakeData[];
  earthquakeDisplays: IEarthquakeDisplay[];
  filteredEarthquakes: IEarthquakeDisplay[];

  constructor(private earthquakeFilterService: EarthquakeFilterService) { }

  ngOnInit(): void {
    this.earthquakeDisplays = this.earthquakeData.map(quake => this.mapToEarthquakeDisplays(quake, null));
    this.filteredEarthquakes = this.earthquakeDisplays;
    this.earthquakeFilterService.filterText.subscribe(this.filterEarthquakes.bind(this));
  }

  filterEarthquakes(filterText: string): void {
    this.filteredEarthquakes = this.earthquakeFilterService.getFilteredEarthquakes(filterText, this.earthquakeDisplays);
  }

  private mapToEarthquakeDisplays(earthquake: IEarthquakeData, showDetails?: boolean): IEarthquakeDisplay {
    return <IEarthquakeDisplay>{ earthquake: earthquake, showDetails: showDetails != null ? true : false };
  }

  toggleDetails(earthquake: IEarthquakeDisplay): void {
    earthquake.showDetails = !earthquake.showDetails;
  }
}

export interface IEarthquakeDisplay {
  showDetails: boolean;
  earthquake: IEarthquakeData;
}
