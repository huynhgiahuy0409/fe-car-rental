import { SD_MODE, WD_MODE } from './../../../../models/constance';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerUtilService } from 'src/app/services/timer-util.service';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  providers: [TimerUtilService]
})
export class CarDetailComponent implements OnInit{
  @Input()
  rentalModePath!: string
  isFavoriteCar: boolean = false
  startAndReturnHrOptions: any
  /*  */
  carBookingFG!: FormGroup
  constructor(private timerUtilService: TimerUtilService, private matDialog: MatDialog, private __fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router){
    this.startAndReturnHrOptions = this.timerUtilService.startAndReturnHrOptions
    this.carBookingFG = this.__fb.group(
      {
        pickUpDate: ['', Validators.required],
        returnDate: ['', Validators.required],
        pickUpTime: ['', Validators.required],
        returnTime: ['', Validators.required],
        deliveryLocation:  ['', Validators.required],
      }
    )
    this.activatedRoute.data.subscribe(data => {
      this.rentalModePath = data['rentalModePath']
    })
  }
  ngOnInit(): void {
  }
  editDeliveryLocation(){ 
    this.matDialog.open(DeliveryLocationEditComponent, {
      'enterAnimationDuration': '500ms',
      'exitAnimationDuration': '500ms',
    })
  }
}
