import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/Car';
import { RentalService } from '../rental.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(private rentalService: RentalService) {}
  cars: Car[] = [];
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.rentalService.getCars().subscribe((c) => (this.cars = c));
  }
}
