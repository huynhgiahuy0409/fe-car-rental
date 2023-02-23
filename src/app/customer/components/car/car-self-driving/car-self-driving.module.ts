import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarSelfDrivingRoutingModule } from './car-self-driving-routing.module';
import { CarSelfDrivingComponent } from './car-self-driving.component';


@NgModule({
  declarations: [
    CarSelfDrivingComponent
  ],
  imports: [
    CommonModule,
    CarSelfDrivingRoutingModule
  ]
})
export class CarSelfDrivingModule { }
