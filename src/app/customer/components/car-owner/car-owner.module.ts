import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarOwnerRoutingModule } from './car-owner-routing.module';
import { CarOwnerComponent } from './car-owner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CarRegisterComponent } from './components/car-register/car-register.component';


@NgModule({
  declarations: [
    CarOwnerComponent,
    NavbarComponent,
    CarRegisterComponent
  ],
  imports: [
    CommonModule,
    CarOwnerRoutingModule,
    MaterialAngularModule,
  ]
})
export class CarOwnerModule { }
