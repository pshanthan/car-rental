import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/Car';
import { RentalService } from '../rental.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
  ) {}
  currentCar: Car | null = null;
  editingId: number | null = null;

  carForm = new FormGroup({
    make: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    model: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    year: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    mileage: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      this.rentalService.getCars().subscribe((cars) => {
        const found = cars.find((c) => c.id === Number(idParam));
        if (found) {
          this.carForm.patchValue({
            make: found.make,
            model: found.model,
            year: String(found.year),
            mileage: String(found.mileage),
          });
        }
      });
    }
  }
  onSubmit() {
    const addedCar = this.carForm.getRawValue();
    this.currentCar = {
      make: addedCar.make,
      model: addedCar.model,
      year: Number(addedCar.year),
      mileage: Number(addedCar.mileage),
    };
    if (this.editingId) {
      this.rentalService.updateCar(found);
    }
  }
}
