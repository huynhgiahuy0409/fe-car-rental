import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarSelfDrivingRoutingModule } from './car-self-driving-routing.module';
import { CarSelfDrivingComponent } from './car-self-driving.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';


@NgModule({
  declarations: [
    CarSelfDrivingComponent
  ],
  imports: [
    CommonModule,
    CarSelfDrivingRoutingModule,
    MaterialAngularModule
  ]
})
export class CarSelfDrivingModule { }
