import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarWithDriverRoutingModule } from './car-with-driver-routing.module';
import { CarWithDriverComponent } from './car-with-driver.component';


@NgModule({
  declarations: [
    CarWithDriverComponent
  ],
  imports: [
    CommonModule,
    CarWithDriverRoutingModule
  ]
})
export class CarWithDriverModule { }
