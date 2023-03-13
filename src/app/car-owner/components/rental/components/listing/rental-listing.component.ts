import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss']
})
export class RentalListingComponent {
  now: any;
  locale: any;
  end: any;
  constructor(private _formBuilder: FormBuilder) {
    this.locale = { vi: vi }
    // this.now = format(new Date(), "eeee - dd/mm/yyyy hh:mm", { locale: this.locale.vi }); // with day of week
    this.now = format(new Date(), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
    this.end = format(new Date("2023/03/07"), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
  }
  rentalListSortFormGroup = this._formBuilder.group({
    orderBy: ['0'],
  });


}
