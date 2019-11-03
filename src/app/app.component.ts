import { Component, OnDestroy } from '@angular/core';
import { PositionService } from './services/position.service';
import { WeatherService } from './services/weather.service';
import { QueryOptions } from './services/query-options';
import { Subject, of } from 'rxjs';
import { takeUntil, map, filter, catchError } from 'rxjs/operators';
import { WeatherObject } from './domain/weather';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private _navigator: Navigator = window.navigator;
  private unsub: Subject<void> = new Subject();
  title = 'DataImpact Weather App'
  position: Position;
  weatherObj: WeatherObject;
  searchForm: FormGroup;
  isLoading = true;

  constructor(
    private store: PositionService,
    private weather: WeatherService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: new FormControl('', { validators: [Validators.required] })
    });
    this._navigator.geolocation.getCurrentPosition(
      (res: Position) => this.setPosition(res),
      () => this.isLoading = false
    );

    this.subscribeOnPosition();
    this.subscribeOnSearch();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  subscribeOnPosition(): void {
    this.store.position.pipe(
      takeUntil(this.unsub),
      filter((position: Position) => !!position),
      map((position: Position) => {
        const options = new QueryOptions({lat: position.coords.latitude, lon: position.coords.longitude, units: 'metric'});
        this.getWeatherByGPS(options);
      })
    ).subscribe();
  }

  subscribeOnSearch(): void {
    this.store.city.pipe(
      takeUntil(this.unsub),
      filter((city: string) => !!city),
      map((city: string) => {
        const options = new QueryOptions({q: city, units: 'metric'});
        this.getWeatherByCityName(options);
      })
    ).subscribe();
  }

  getWeatherByGPS(options: QueryOptions): void {
    this.weather.getWeather(options).pipe(
      catchError((err: any) => {
        this.isLoading = false;
        return of();
      })
    ).subscribe((result: WeatherObject) => {
      console.log(result);
      this.isLoading = false;
      this.weatherObj = result;
    });
  }

  setPosition(pos: Position): void {
    this.position = pos;
    this.store.setPosition(pos);
  }

  setCity(): void {
    const city = this.searchForm.get('search').value;
    this.store.setCity(city);
  }

  getWeatherByCityName(options: QueryOptions): void {
    this.weather.getWeather(options).subscribe((result: WeatherObject) => {
      this.searchForm.get('search').reset();
      this.weatherObj = result;
    });
  }
}
