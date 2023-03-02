import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.scss']
})
export class CarListingComponent {
  constructor(private _formBuilder: FormBuilder) { }

  myCarsFormGroup = this._formBuilder.group({
    carStatus: ['0'],
  });

}
