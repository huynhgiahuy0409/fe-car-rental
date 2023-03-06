import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CarOwnerRoutingModule } from './car-owner-routing.module';
import { CarOwnerComponent } from './car-owner.component';
import { CalendarsComponent } from './components/calendars/calendars.component';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CarOwnerService } from './services/car-owner.service';
import { UploadFileService } from './services/upload-file.service';
import { CalendarHeaderModule } from './components/calendars/header/calendar-header.module';
import { ContractComponent } from './components/contract/contract.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    CarOwnerComponent,
    NavbarComponent,
    CarRegisterComponent,
    RegisterFormComponent,
    CarListingComponent,
    CalendarsComponent,
    ContractComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    CarOwnerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    CalendarHeaderModule
  ],
  providers: [
    CarOwnerService,
    UploadFileService
  ]
})
export class CarOwnerModule { }
