import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherObject } from '../domain/weather';
import { environment } from '../../environments/environment';
import { QueryOptions } from './query-options';

const dummyWeatherData: WeatherObject = {
  "coord": {
    "lon": 2.38,
    "lat": 48.87
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 11.07,
    "pressure": 988,
    "humidity": 87,
    "temp_min": 10.56,
    "temp_max": 11.67
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.1,
    "deg": 210
  },
  "clouds": {
    "all": 75
  },
  "dt": 1572802999,
  "sys": {
    "type": 1,
    "id": 6540,
    "country": "FR",
    "sunrise": 1572763190,
    "sunset": 1572798489,
    "message": null,
  },
  "timezone": 3600,
  "id": 2994540,
  "name": "Paris 20 Ménilmontant",
  "cod": 200
}

describe('WeatherService', () => {
  let mockHttp: HttpTestingController;
  let service: WeatherService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  beforeEach(() => {
    service = TestBed.get(WeatherService);
    mockHttp = TestBed.get(HttpTestingController);
  })

  afterEach(() => {
    mockHttp.verify();
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('should make a GET request', async (done: DoneFn) => {
    const options = new QueryOptions({lon: null, lat: null});
    service.getWeather(options).subscribe((result: WeatherObject) => {
      expect(result.name).toBe('Paris 20 Ménilmontant');
    });
    const req = mockHttp.expectOne(request => request.url.includes(`${environment.weather.api}/data/2.5/weather`));
    expect(req.request.method).toBe('GET');
    req.flush(dummyWeatherData);

    done();
  })
});
