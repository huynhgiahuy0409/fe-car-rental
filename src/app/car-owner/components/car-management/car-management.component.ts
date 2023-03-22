import { registerLocaleData } from '@angular/common';
import localeVietnam from '@angular/common/locales/vi';
import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import {
  CalendarEvent, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { addDays, differenceInDays, differenceInYears, format, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import vi from 'date-fns/locale/vi';

registerLocaleData(localeVietnam);
const colors: Record<string, EventColor> = {
  ordered: {
    primary: 'red',
    secondary: 'red',
  },
  deposit: {
    primary: '#fba86d',
    secondary: '#fba86d',
  },
  empty: {
    primary: 'rgba(0, 0, 0, 0.9)',
    secondary: 'rgba(0, 0, 0, 0.9)',
  },
  busy: {
    primary: '#a9a9a9',
    secondary: '#a9a9a9',
  },
  pending: {
    primary: '#fde28b',
    secondary: '#fde28b',
  }
};
@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LOCALE_ID, useValue: 'vi-VN'
    },
  ],
  encapsulation: ViewEncapsulation.None
})
export class CarManagementComponent {
  car_id: any;
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.car_id = this.route.snapshot.paramMap.get('id');
  }

  optionControl = new FormControl('0' as FloatLabelType);

  showModalPriceIterate = false;
  toggleShowModalPriceIterate() {
    this.showModalPriceIterate = !this.showModalPriceIterate;
  }

  showModalTimeIterate = false;
  toggleShowModalTimeIterate() {
    this.showModalTimeIterate = !this.showModalTimeIterate;
  }

  priceIterateFormGroup = this._formBuilder.group({
    monday: ['0'],
    tuesday: ['0'],
    wednesday: ['0'],
    thursday: ['0'],
    friday: ['0'],
    saturday: ['1300'],
    sunday: ['0'],
    limitIterateTime: [true],
    limitIterateDate: ['8/3/2001']
  });

  limitTimeRangeFormGroup = this._formBuilder.group({
    from: [{ value: "0", disabled: true }],
    to: ["3"]
  });


  priceByDateFormGroup = this._formBuilder.group({
    price: ['1300'],
    date: ['']
  });

  ngOnInit(): void {
    this.priceIterateFormGroup.get("limitIterateTime")?.valueChanges.subscribe((value) => {
      if (value === true) {
        this.priceIterateFormGroup.get("limitIterateDate")?.enable();
      } else {
        this.priceIterateFormGroup.get("limitIterateDate")?.disable();
      }
    });
  }


  locale: string = 'vi';
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Mazda 3 - 123 - 51a',
      color: colors['ordered'],
    },
    {
      start: new Date(),
      title: 'Mazda 44 - 123 - 51a',
      color: colors['ordered'],
    },
    {
      start: new Date("2023/03/20"),
      title: 'Mazda 4 - 1234 - 51b',
      color: colors['deposit'],
    },
    {
      start: new Date(),
      title: 'Lamborghini - 12345 - 51e',
      color: colors['pending'],
    },
    {
      start: new Date("2023/03/19"),
      title: 'Bận',
      color: colors['busy'],
    },
  ];
  // activeDayIsOpen!: boolean;
  activeDayIsOpen = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // check same month
    if (isSameMonth(new Date(), this.viewDate)) {
      //check same day and modal list event is open or busy to not open the modal or close the modal
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0 || this.isBusy({ events: events }) || Number(this.optionControl.value) < 2
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    if (!this.isBusy({ events: events })) {
      this.clickedDate = new Date(date);
      const actionType = Number(this.optionControl.value);
      const isAfter = this.isSameOrBefore(new Date(), this.clickedDate);

      if (isAfter)
        if (actionType === 0) {
          this.priceByDateFormGroup.get("date")?.setValue(format(new Date(date), "dd/MM/yyyy", { locale: vi }));
          this.toggleShowModalPriceByDate();
          console.log("price option", format(new Date(this.clickedDate), "dd/MM/yyyy hh:mm", { locale: vi }));
        } else if (actionType === 1) {
          this.disableDate(this.clickedDate);
          // console.log("disabled date");
          // console.log("date option", format(new Date(this.clickedDate), "dd/MM/yyyy hh:mm", { locale: vi }));
        }
    }
  }

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log("time changed");
    console.log(event, newStart, newEnd);

    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  cssClass: string = "bg-busy";
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (this.isBusy(day)) {
        day.cssClass = this.cssClass;
      }
    });
  }

  clickedDate!: Date;
  clickedColumn!: number;

  clickDate(event: any) {
    this.clickedDate = new Date(event);
    const actionType = Number(this.optionControl.value);
    if (actionType === 0) {
      console.log("price option", format(new Date(this.clickedDate), "dd/MM/yyyy hh:mm", { locale: vi }));
    } else if (actionType === 1) {
      console.log("date option", format(new Date(this.clickedDate), "dd/MM/yyyy hh:mm", { locale: vi }));
    }
  }


  showModalPriceByDate = false;
  toggleShowModalPriceByDate() {
    this.showModalPriceByDate = !this.showModalPriceByDate;
  }

  refreshView(): void {
    this.refresh.next();
  }

  disableDate(date: Date) {
    const existedDate = this.events.find((i) => isSameDay(i.start, date));

    const obj = {
      start: date,
      title: "",
      color: colors['busy']
    };

    //demo disable date action, remove this if backend implemented
    if (!existedDate) {
      obj.title = 'Bận';
      obj.color = colors['busy'];
    } else if (existedDate && existedDate.title === 'Bận') {
      this.events = this.events.filter((i) => !isSameDay(i.start, existedDate.start));
      obj.title = 'Trống';
      obj.color = colors['empty'];
    }
    this.events.push(obj);
    console.log("After pushed", this.events);

    this.refreshView();
  }

  isBusy(event: any): Boolean {
    const { events } = event;
    return events.some((i: { color: { primary: string; }; }) => i.color.primary === colors['busy'].primary);
  }

  orderedSize(event: any): number {
    const { events } = event;
    return events.filter((i: { color: { primary: string; }; }) => i.color.primary === colors['ordered'].primary).length;
  }

  depositSize(event: any): number {
    const { events } = event;
    return events.filter((i: { color: { primary: string; }; }) => i.color.primary === colors['deposit'].primary).length;
  }

  pendingSize(event: any): number {
    const { events } = event;
    return events.filter((i: { color: { primary: string; }; }) => i.color.primary === colors['pending'].primary).length;
  }

  getDateInFormat(date: Date): string {
    return format(new Date(date), "dd/MM/yyyy", { locale: vi });
  }

  isSameOrBefore(date1: Date, date2: Date) {
    return differenceInDays(date1, date2) <= 0;
  }
}
