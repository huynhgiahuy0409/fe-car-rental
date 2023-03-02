import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimerUtilService } from 'src/app/services/timer-util.service';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  providers: [TimerUtilService]
})
export class CarDetailComponent {
  arr = [1,2,3,4,5,6,7, 8]
  isFavoriteCar: boolean = false
  startAndReturnHrOptions: any
  /*  */
  carBookingFG!: FormGroup
  constructor(private timerUtilService: TimerUtilService, private matDialog: MatDialog, private __fb: FormBuilder){
    this.startAndReturnHrOptions = this.timerUtilService.startAndReturnHrOptions
    this.carBookingFG = this.__fb.group(
      {
        pickUpDate: '',
        pickUpTime: '',
        returnDate: '',
        returnTime: '',
        rentalDayNumber: '',
        deliveryLocation: '',
        priceDetail: this.__fb.group({
          rentalUnitPrice: '',
          serviceCharge: '',
          insuranceFee: '',
          deliveryFee: '',
          totalRentalFee: '',
          total: ''
        }),
      }
    )
  }
  editDeliveryLocation(){ 
    this.matDialog.open(DeliveryLocationEditComponent, {
      'enterAnimationDuration': '500ms',
      'exitAnimationDuration': '500ms',
    })
  }
}
