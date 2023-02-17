import { Platform } from '@angular/cdk/platform';
import { DatePipe } from '@angular/common';
import { Component, Inject, Injectable, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import {
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
import {MomentDateAdapter} from '@angular/material-moment-adapter';
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
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BannerComponent implements OnInit {
  serviceType: 'SELF_DRIVING' | 'DRIVER' = 'SELF_DRIVING';
  addressControl = new FormControl('');
  options: string[] = [
    'Thành phố Hồ Chí Minh',
    'Hà Nội',
    'Thừa Thiên Huế',
    'Thành phố Cần Thơ',
  ];
  filteredAddressOptions!: Observable<string[]>;
  public hrs: string[] = [];
  public selectedQuantity: string = '0:00';
  ngOnInit(): void {
    this.hrsData();
    this.filteredAddressOptions = this.addressControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap((value) => {
        return value ? this._filter(value) : of([]);
      })
    );
  }
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
  hrsData() {
    for (let i = 0; i <= 23; i++) {
      let str = `${i}:00`;
      this.hrs.push(str);
    }
  }
}
