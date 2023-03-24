import { SD_MODE, WD_MODE } from './../../../../models/constance';
import { Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router, RouteReuseStrategy } from '@angular/router';
import {
  RentalHourOption,
  TimerUtilService,
} from 'src/app/services/timer-util.service';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';
import { PromoEditComponent } from './dialog/promo-edit/promo-edit.component';
import { BookingConfirmComponent } from './dialog/booking-confirm/booking-confirm.component';
import { filter, map } from 'rxjs';
import { Location } from '@angular/common';
import { RouteCatchService } from 'src/app/customer/route-catch.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  
})
export class CarDetailComponent implements OnInit {
  @Input()
  rentalModePath!: string;
  isFavoriteCar: boolean = false;
  startAndReturnHrOptions: any;
  rentalHrOptions!: RentalHourOption[];
  /*  */
  carBookingFG!: FormGroup;
  constructor(
    private timerUtilService: TimerUtilService,
    private matDialog: MatDialog,
    private __fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private routeCatchService: RouteCatchService,
    private route: ActivatedRoute
  ) {
    this.startAndReturnHrOptions =
      this.timerUtilService.startAndReturnHrOptions;
    this.carBookingFG = this.__fb.group({
      pickUpDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      pickUpTime: ['', Validators.required],
      returnTime: ['', Validators.required],
      deliveryLocation: ['', Validators.required],
    });
    this.activatedRoute.data.subscribe((data) => {
      this.rentalModePath = data['rentalModePath'];
      console.log(this.rentalModePath);
      
    });
    
  }
  startDate!: Date;
  endDate!: Date;
  address!: string;
  savedScrollPosition!: any
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.startDate = new Date(+params['startDate']);
      this.endDate = new Date(+params['endDate']);
      this.address = params['address'];
      
    });
    this.savedScrollPosition = document.documentElement.scrollTop;
  }
  editDeliveryLocation(title: string) {
    this.matDialog.open(DeliveryLocationEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
      },
    });
  }
  editPromo() {
    this.matDialog.open(PromoEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }
  confirmBooking() {
    this.matDialog.open(BookingConfirmComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '80%',
      height: '100vh',
    });
  }
  onClose(){
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
    };
    this.router.navigate(['/find/filter'], navigationExtras);
  }
}
