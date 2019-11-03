import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherService } from './services/weather.service';
import { PositionService } from './services/position.service';
import { of } from 'rxjs';

const position: Position = {
  coords: {
    accuracy: 3240,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 48.86528,
    longitude: 2.3789568,
    speed: null,
  },
  timestamp: 1572800370452
};

const positionServiceStub = {
  position: of(position),
  setPosition: () => of(position),
  city: of('Paris'),
  setCity: () => of('Paris')
};

describe('AppComponent', () => {
  let service: WeatherService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MaterialModule, ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ WeatherService, { provide: PositionService, useValue: positionServiceStub} ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(WeatherService);
    spy = spyOn(service, 'getWeather').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DataImpactWeatherApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('DataImpact Weather App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar h1').textContent).toContain('DataImpact Weather App');
  });

  it(`should fetch weather data with GPS data`, async (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    
    component.setPosition(position);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should fetch weather data with user input value', async (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    
    component.searchForm.get('search').setValue('Paris');
    component.setCity();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    done();
  })
});
