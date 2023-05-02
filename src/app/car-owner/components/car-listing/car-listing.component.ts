import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarOwnerService } from '../../services/car-owner.service';
import { RegisteredCarResponse } from 'src/app/models/response/model';
import { CarStatus } from 'src/app/models/enum';
import { CAR_IMG } from 'src/app/models/constance';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.scss']
})
export class CarListingComponent {
  constructor(private _formBuilder: FormBuilder, private carService: CarOwnerService) {
  }

  readonly BASE_IMG: string = CAR_IMG;

  registeredCarList: RegisteredCarResponse[] = [];
  filteredCarList: RegisteredCarResponse[] = [];

  myCarsFormGroup = this._formBuilder.group({
    carStatus: ['ALL'],
  });

  ngOnInit(): void {
    this.carService.getAllRegisteredCar("hieu").subscribe(
      (data) => {
        console.log(data);
        this.registeredCarList = data;
        this.filteredCarList = data;
        if (this.registeredCarList.length < 1)
          this.myCarsFormGroup.disable();
      });
    this.myCarsFormGroup.get("carStatus")?.valueChanges.subscribe(data => {
      if (data === "ALL")
        this.filteredCarList = this.registeredCarList;
      else
        this.filteredCarList = this.registeredCarList.filter(i => i.status == data);
    });
  }

  getStatusName(status: CarStatus) {
    switch (status) {
      case CarStatus.BANNED:
        return "Tạm khóa";
      case CarStatus.PENDING_APPROVAL:
        return "Đang chờ duyệt";
      case CarStatus.ACTIVE:
        return "Đang hoạt động";
      case CarStatus.BUSY:
        return "Bận";
      case CarStatus.RENTED:
        return "Đã cho thuê";
      default:
        return "Không xác định";
    }
  }

  getStatusClassname(status: CarStatus) {
    switch (status) {
      case CarStatus.BANNED:
        return "suspend";
      case CarStatus.PENDING_APPROVAL:
        return "pending";
      case CarStatus.ACTIVE:
        return "active";
      case CarStatus.BUSY:
        return "busy";
      case CarStatus.RENTED:
        return "rented";
      default:
        return "";
    }
  }

  getMoneyInFormat(money: number) {
    return getMoneyFormat(money);
  }

}
