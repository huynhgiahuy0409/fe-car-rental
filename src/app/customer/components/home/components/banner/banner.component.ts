import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
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
