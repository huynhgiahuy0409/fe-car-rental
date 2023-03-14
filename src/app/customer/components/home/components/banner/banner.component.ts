import { Platform } from '@angular/cdk/platform';
import { DatePipe } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Inject,
  Injectable,
  OnInit,
  Optional,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  tap,
  timeout,
  timer,
} from 'rxjs';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TimeFormat } from 'src/app/models/model';
import { RentalHourOption } from 'src/app/services/timer-util.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
export interface DriverService {
  pickUpPlace: string;
  startTime: {
    rentalDate: string;
    startHour: number;
    rentalHours: number;
  };
  endTime?: {
    rentalDate: string;
    startHour: number;
  };
  truthRentalHrs: number
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BannerComponent implements OnInit, AfterViewInit {
  serviceType: 'Self_DRIVING' | 'DRIVER' = 'DRIVER';
  addressControl = new FormControl('');
  options: string[] = [
    'Thành phố Hồ Chí Minh',
    'Hà Nội',
    'Thừa Thiên Huế',
    'Thành phố Cần Thơ',
  ];
  filteredAddressOptions!: Observable<string[]>;
  // 24 hours options just h:00
  hrs: string[] = []; // default
  // 48 hours include h:00 & h:30
  startAndReturnHrOptions: { label: string; value: number }[] = []; // rental and return car
  rentalHrOptions: RentalHourOption[] = [];
  selectedQuantity: string = '0:00';
  driverServiceFormGroup!: FormGroup;
  withDriverTimeUp!: string;
  constructor(private _fb: FormBuilder) {
    this.setHrsData();
    this._setStartAndReturnHrOpts();
    this._setRentalHrsOpts();
    this.driverServiceFormGroup = this._fb.group({
      pickUpPlace: ['', Validators.required],
      startTime: this._fb.group({
        rentalDate: ['', Validators.required],
        startHour: ['', Validators.required],
        rentalHours: [this.rentalHrOptions[0].value, Validators.required],
      }),
      endTime: this._fb.group({
        rentalDate: ['', Validators.required],
        endHour: ['', Validators.required],
      }),
    });
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    /* 
      detach change event of pickUpPlace FormControl of driverServiceFormGroup
      => filter list of places to update auto complete
    */
    this.filteredAddressOptions = this.driverServiceFormGroup
      .get('pickUpPlace')!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        switchMap((value) => {
          return value ? this._filter(value) : of([]);
        })
      );

    /* 
    */
        this.driverServiceFormGroup.valueChanges.subscribe(v => console.log(v));
    /* 
    detach change event of rentalDate$ and startHour$
    => reassign the options in rentalHrOptions to update view
    */
    let rentalDate$ = this.driverServiceFormGroup
      .get('startTime')!
      .get('rentalDate')!.valueChanges;
    let startHour$ = this.driverServiceFormGroup
      .get('startTime')!
      .get('startHour')!.valueChanges;
    combineLatest([rentalDate$, startHour$]).subscribe(
      ([rentalDateMoment, startHourMs]) => {
        let rentalDate = rentalDateMoment.valueOf();
        let startHour = startHourMs;
        this.rentalHrOptions.forEach((e, idx) => {
          if (idx !== 0) {
            let endHoursString: string = this._convertMsToTime(
              startHour + e.value
            );
            let endDateString = new Date(rentalDate + startHour + e.value);
            let getDate = endDateString.getDate();
            let getMonth = endDateString.getMonth();
            let getYear = endDateString.getFullYear();
            e.subLabel =
              this.withDriverTimeUp = `Kết thúc lúc ${endHoursString}\n${getDate}/${getMonth}/${getYear}`;
          }
        });
      }
    );
    /* 
    detach change event of driverServiceFormGroup
    => reassign the options in rentalHrOptions to update view
    */
    this.driverServiceFormGroup
      .get('startTime')
      ?.get('rentalHours')
      ?.valueChanges.subscribe((v) => {
      });
  }
  /* 
    filter search with auto complete
    */
  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return timer(500).pipe(
      map((_) => this.options),
      map((addresses) => {
        return addresses.filter((address) =>
          address.toLowerCase().includes(filterValue)
        );
      })
    );
  }
  private setHrsData() {
    for (let i = 0; i <= 23; i++) {
      let str = `${i}:00`;
      this.hrs.push(str);
    }
  }
  /* 
    
    */
  private _setStartAndReturnHrOpts() {
    for (let i = 0; i <= 23; i++) {
      let minutesOps = ['00', '30'];
      minutesOps.forEach((m) => {
        let tempValue = i * 3600000;
        if (m === '30') {
          tempValue += 1800000;
        }
        this.startAndReturnHrOptions.push({
          label: `${i}:${m}`,
          value: tempValue,
        });
      });
    }
  }
  /* 
    
    */
  private _setRentalHrsOpts() {
    this.rentalHrOptions.push({
      label: `Tuỳ chọn`,
      value: -1,
    });
    for (let index = 2; index <= 60; index++) {
      this.rentalHrOptions.push({
        label: `${index} tiếng`,
        value: index * 3600000,
      });
    }
  }

  /* 
    
    */
  private _padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private _convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;
    return `${this._padTo2Digits(hours)}:${this._padTo2Digits(minutes)}`;
  }
  onSubmitUrbanWithDriverForm(){
    let formValue = this.driverServiceFormGroup.value
    formValue.startTime.rentalDate = formValue.startTime.rentalDate.valueOf()
    formValue.endTime.rentalDate = formValue.endTime.rentalDate.valueOf()
    if(formValue.startTime.rentalHours === -1){
      let rentalStartHrsMs: number =  formValue.startTime.rentalDate + formValue.startTime.startHour
      let returnHrsMs: number =  formValue.endTime.rentalDate  + formValue.endTime.endHour
      let truthRentalHrsMs: number = returnHrsMs - rentalStartHrsMs
      formValue.truthRentalHrs = truthRentalHrsMs
    }else{
      formValue.truthRentalHours = formValue.startTime.rentalHours
      formValue.endTime = undefined
    }
    const truthFormValue: DriverService = formValue
    console.log(truthFormValue);
    alert(JSON.stringify(truthFormValue, null, 4));
  }
}
