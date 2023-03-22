import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CarOwnerRoutingModule } from './car-owner-routing.module';
import { CarOwnerComponent } from './car-owner.component';
import { CalendarsComponent } from './components/calendars/calendars.component';
import { CalendarHeaderModule } from './components/calendars/header/calendar-header.module';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarOwnerService } from './services/car-owner.service';

@NgModule({
  declarations: [
    CarOwnerComponent,
    NavbarComponent,
    CarListingComponent,
    CalendarsComponent,
  ],
  imports: [
    CommonModule,
    CarOwnerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    CalendarHeaderModule,
  ],
  providers: [
    CarOwnerService,
  ]
})
export class CarOwnerModule { }
