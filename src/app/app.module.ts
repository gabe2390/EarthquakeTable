import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { GuruAppComponent } from './app.component';
import { FilterDisplayDataComponent } from 'components/filter-display-data/filter-display-data.component';
import { EarthquakeDisplayComponent } from '../components/earthquake-display/earthquake-display.component';
import { EarthquakeFilterService } from '../services/earthquake-filter.service';
import { EarthquakeDataService } from './../services/earthquake-data.service';

@NgModule({
  declarations: [
    GuruAppComponent,
    EarthquakeDisplayComponent,
    FilterDisplayDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EarthquakeDataService, EarthquakeFilterService],
  bootstrap: [GuruAppComponent]
})
export class GuruAppModule { }
