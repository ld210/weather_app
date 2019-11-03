import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _position: BehaviorSubject<Position> = new BehaviorSubject<Position>(null);
  public position: Observable<Position> = this._position.asObservable();

  private _city: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public city: Observable<string> = this._city.asObservable();

  constructor() { }

  setPosition(pos: Position): void {
    this._position.next(pos);
  }

  setCity(city: string): void {
    this._city.next(city);
  }
}
