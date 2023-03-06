import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTripRoutingModule } from './my-trip-routing.module';
import { MyTripComponent } from './my-trip.component';
import { TripOrderOverviewComponent } from './components/trip-order-overview/trip-order-overview.component';
import { FilterComponent } from './dialog/filter/filter.component';


@NgModule({
  declarations: [
    MyTripComponent,
    TripOrderOverviewComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MyTripRoutingModule,
    MaterialAngularModule
  ]
})
export class MyTripModule { }
