import { registerLocaleData } from '@angular/common';
import localeVietnam from '@angular/common/locales/vi';
import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  CalendarEvent, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';


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
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LOCALE_ID, useValue: 'vi-VN'
    },
  ],
})
export class CalendarsComponent {
  constructor(private _formBuilder: FormBuilder) { }

  sortedByFormGroup = this._formBuilder.group({
    sortedBy: ['0'],
    nameOrCarPlate: ['']
  });
  locale: string = 'vi';
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Mazda 3 - 123 - 51a',
      color: colors['ordered'],
      draggable: true,
    },
    {
      start: new Date(),
      title: 'Mazda 44 - 123 - 51a',
      color: colors['ordered'],
      draggable: true,
    },
    {
      start: new Date("2023/03/20"),
      title: 'Mazda 4 - 1234 - 51b',
      color: colors['deposit'],
      draggable: true
    },
    {
      start: new Date(),
      title: 'Lamborghini - 12345 - 51e',
      color: colors['pending'],
      draggable: true
    },
    {
      start: new Date("2023/03/19"),
      title: 'Bận',
      color: colors['busy'],
      draggable: true
    },
  ];
  filteredEvents: CalendarEvent[] = [...this.events];
  activeDayIsOpen!: boolean;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0 || this.isBusy({ events: events })
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
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

  sortedByOrder = false;
  toggleSortedByOrder() {
    this.sortedByOrder = !this.sortedByOrder;
    this.sortCalendars();
  }

  sortCalendars() {

  }

  searchByNameCarPlate() {
    const value = this.sortedByFormGroup.get('nameOrCarPlate')?.value
    this.filteredEvents = this.events.filter(i => i.title.toLowerCase().indexOf(String(value?.toLowerCase())) > -1);
    this.refreshView();
  }

  refreshView(): void {
    this.refresh.next();
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
}
