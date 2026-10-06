import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor() {}
  private cars = new BehaviorSubject<Car[]>([
    {
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      mileage: 19000,
    },
  ]);
  getCars(): Observable<Car[]> {
    return this.cars.asObservable();
  }
  addCar(c: Car) {
    c.id = Date.now();
    const current = this.cars.value;
    return this.cars.next([...current, c]);
  }
  updateCar(c: Car) {
    const current = this.cars.value;
    const nextList = current.map((p) => (p.id === c.id ? p : c));
    return this.cars.next(nextList);
  }
}
