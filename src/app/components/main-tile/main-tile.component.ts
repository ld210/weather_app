import { Component, Input } from '@angular/core';
import { WeatherObject } from '../../domain/weather';

@Component({
  selector: 'main-tile',
  templateUrl: './main-tile.component.html',
  styleUrls: ['./main-tile.component.scss']
})
export class MainTileComponent {
  data: WeatherObject;
  @Input() weatherData: WeatherObject;
}
