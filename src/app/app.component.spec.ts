import { IEarthquakeData } from './../models/earthquake-data.model';
import { EarthquakeDataService } from './../services/earthquake-data.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { GuruAppComponent } from './app.component';

let fixture: ComponentFixture<GuruAppComponent>;
let app: GuruAppComponent;
let earthquakeDataServiceMock: EarthquakeDataService;
let earthquakes: IEarthquakeData[];

describe('GuruAppComponent', () => {
  describe('OnInit', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          GuruAppComponent
        ],
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(GuruAppComponent);
      app = fixture.debugElement.componentInstance;

      earthquakeDataServiceMock = jasmine.createSpyObj('EarthquakeDataService', ['getEarthquakeData']);
      earthquakeDataServiceMock.getEarthquakeData = jasmine.createSpy('getEarthquakeData').and.returnValue(earthquakes);
    });

    it('should create the app', async(() => {
      expect(app).toBeTruthy();
    }));

    it(`should set status to loading'`, async(() => {
      expect(app.restCallStatus).toEqual('Loading');
    }));

    it(`should call earthquake data service to retrieve data'`, async(() => {
      expect(earthquakeDataServiceMock.getEarthquakeData).toHaveBeenCalled();
    }));

    it(`should set earthquake data  and restCallStatus upon resolution of the promise`, async(() => {
      expect(app.earthquakeData).toBe(earthquakes);
      expect(app.restCallStatus).toBe('Loading');
    }));

    it(`should set earthquake data  and restCallStatus upon rejcetion of the promise`, async(() => {
      expect(app.earthquakeData).toBe([]);
      expect(app.restCallStatus).toBe('Error');
    }));

  });
});
