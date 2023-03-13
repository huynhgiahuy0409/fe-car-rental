import { TimerUtilService } from 'src/app/services/timer-util.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderOverview } from './components/trip-order-overview/trip-order-overview.component';
import { FilterComponent } from './dialog/filter/filter.component';
import { COMPLETE_MESSAGE, COMPLETE_STATUS } from 'src/app/models/constance';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss'],
})
export class MyTripComponent {
  isEmptyTrip: boolean = false;
  sltTabIdx: number = 1;
  curTrips!: PurchaseOrderOverview[]
  tripHistList: PurchaseOrderOverview[] = [
    {
      ownerName: 'huynh gia huy',
      carName: 'TOYOTA 2020',
      typeOfCar: 'Số tự động',
      mode: 'Tự lái',
      unitPrice: 230000,
      start: {
        startTime: this.timeUtils.formatTime(new Date()),
        startDate: this.timeUtils.formatDate(new Date()),
      },
      end: {
        endTime: this.timeUtils.formatTime(new Date()),
        endDate: this.timeUtils.formatDate(new Date()),
      },
      status: COMPLETE_STATUS,
      statusMessage: COMPLETE_MESSAGE,
      totalPayment: 300000,
    },
  ];
  constructor(private matDialog: MatDialog, private timeUtils: TimerUtilService) {
    console.log(this.timeUtils.formatTime(new Date()));
    
  }
  openFilterDialog() {
    this.matDialog.open(FilterComponent, {
      data: {
        sltTabIdx: this.sltTabIdx,
      },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }
}
