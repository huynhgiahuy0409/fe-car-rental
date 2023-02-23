import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';
import { CarRoutingModule } from './car-routing.module';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarDetailModule } from './car-detail/car-detail.module';



@NgModule({
  declarations: [
    CarComponent,
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    CarDetailModule
  ]
})
export class CarModule { }
