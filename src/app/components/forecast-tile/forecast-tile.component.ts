import { Component, Input } from '@angular/core';
import { WeatherObject } from 'src/app/domain/weather';

@Component({
  selector: 'forecast-tile',
  templateUrl: './forecast-tile.component.html',
  styleUrls: ['./forecast-tile.component.scss']
})
export class ForecastTileComponent {
  @Input() forecastData: Partial<WeatherObject>;
}
