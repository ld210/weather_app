export interface Weather {
    "id": number;
    "main": string;
    "description": string;
    "icon": string;
}

export interface WeatherObject {
    "coord": {
      "lon": number,
      "lat": number
    },
    "weather": Weather[],
    "base": string;
    "main": {
      "temp": number;
      "pressure": number;
      "humidity": number;
      "temp_min": number;
      "temp_max": number;
    },
    "visibility": number;
    "wind": {
      "speed": number;
      "deg": number;
    },
    "clouds": {
      "all": number;
    },
    "dt": number;
    "dt_text"?: string;
    "sys": {
      "type": number;
      "id": number;
      "message": number;
      "country": string;
      "sunrise": number;
      "sunset": number;
    },
    "timezone": number;
    "id": number;
    "name": string;
    "cod": number;
  }

  export interface ForecastObject {
      city: any;
      cnt: number;
      cod: string;
      list: Partial<WeatherObject>[];
      message: any;
  }