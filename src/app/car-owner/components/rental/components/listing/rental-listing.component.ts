import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { CAR_IMG } from 'src/app/models/constance';
import { RentalListingResponse } from 'src/app/models/response/model';

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss']
})
export class RentalListingComponent {
  now: any;
  locale: any;
  end: any;
  rentalList: RentalListingResponse[] = [];
  readonly BASE_IMG = CAR_IMG;

  constructor(private _formBuilder: FormBuilder, private carService: CarOwnerService) {
    this.locale = { vi: vi }
    // this.now = format(new Date(), "eeee - dd/mm/yyyy hh:mm", { locale: this.locale.vi }); // with day of week
    this.now = format(new Date(), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
    this.end = format(new Date("2023/03/07"), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
  }

  rentalListSortFormGroup = this._formBuilder.group({
    orderBy: ['0'],
  });

  ngOnInit(): void {
    this.carService.getRentalListByOwner("hieu").subscribe(res => {
      this.rentalList = res;
    });
  }

  getFormattedDate(date: number) {
    return format(new Date(date), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
  }

}
