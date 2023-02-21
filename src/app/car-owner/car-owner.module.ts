import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CarOwnerRoutingModule } from './car-owner-routing.module';
import { CarOwnerComponent } from './car-owner.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CarOwnerService } from './services/car-owner.service';


@NgModule({
  declarations: [
    CarOwnerComponent,
    NavbarComponent,
    CarRegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    CarOwnerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CarOwnerService
  ]
})
export class CarOwnerModule { }
