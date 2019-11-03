import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QueryOptions } from './query-options';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _baseUrl = environment.weather.api;

  constructor(
    private http: HttpClient
  ) { }

  getForecast(queryOptions: QueryOptions): Observable<any> {
    return this.http.get(`${this._baseUrl}/data/2.5/forecast?${queryOptions.toQueryString()}`);
  }

  getWeather(queryOptions: QueryOptions): Observable<any> {
    return this.http.get(`${this._baseUrl}/data/2.5/weather?${queryOptions.toQueryString()}`);
  }
}
