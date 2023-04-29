import { SD_MODE, WD_MODE } from './../../../../models/constance';
import { AfterViewInit, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  RentalHourOption,
  TimerUtilService,
} from 'src/app/services/timer-util.service';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';
import { PromoEditComponent } from './dialog/promo-edit/promo-edit.component';
import { BookingConfirmComponent } from './dialog/booking-confirm/booking-confirm.component';
import { Location } from '@angular/common';
import { RouteCatchService } from 'src/app/customer/route-catch.service';
import { CarDTO } from 'src/app/models/model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit, AfterViewInit {
  @Input()
  car$!: Observable<CarDTO>
  car!: CarDTO
  @Input()
  rentalMode!: 'sd' | 'wd';
  formType!: 'sd' | 'wd';
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
    private route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
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
    if (this.rentalMode) {
      this.formType = this.data.rentalMode;
    }
  }
  ngAfterViewInit(): void {
    if(this.data && this.data.rentalMode){
      this.formType = this.data.rentalMode
    }
  }
  startDate!: Date;
  endDate!: Date;
  address!: string;
  savedScrollPosition!: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
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
  onClose() {
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
    };
    this.router.navigate(['/find/filter'], navigationExtras);
  }
}
