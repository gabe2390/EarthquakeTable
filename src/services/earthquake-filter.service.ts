import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IEarthquakeDisplay } from 'components/earthquake-display/earthquake-display.component';

@Injectable()
export class EarthquakeFilterService {
  public filterText: Subject<string>;
  private displayLimit = 20;

  constructor() {
    this.filterText = new Subject();
  }

  public notifyFilterTextChanges(changedText: string): void {
    this.filterText.next(changedText);
  }

  public getFilteredEarthquakes(filterText: string, earthquakes: IEarthquakeDisplay[]): IEarthquakeDisplay[] {
    if (filterText == null) { return earthquakes; };

    const earthquakeList = earthquakes.filter(display =>
      this.matchEarthquakeProperty(display.earthquake.place, filterText) ||
      this.matchEarthquakeProperty(display.earthquake.id.toString(), filterText));

    return earthquakeList.length <= this.displayLimit ? earthquakeList : earthquakeList.splice(0, this.displayLimit);
  }

  private matchEarthquakeProperty(prop: string, comparisonProp?: string): boolean {
    return prop.toLowerCase().search(comparisonProp == null ? '' : comparisonProp.toLowerCase()) > -1;
  }
}
