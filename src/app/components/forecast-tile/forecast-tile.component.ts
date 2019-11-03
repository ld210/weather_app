import { Component, OnInit, Input } from '@angular/core';
import { WeatherObject } from 'src/app/domain/weather';

@Component({
  selector: 'forecast-tile',
  templateUrl: './forecast-tile.component.html',
  styleUrls: ['./forecast-tile.component.scss']
})
export class ForecastTileComponent implements OnInit {
  @Input() forecastData: Partial<WeatherObject>;
  constructor() { }

  ngOnInit() {
    console.log(this.forecastData);
  }

}
