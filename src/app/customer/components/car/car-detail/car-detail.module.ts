import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetailComponent } from './car-detail.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';
import { MyLocationComponent } from './dialog/my-location/my-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromoEditComponent } from './dialog/promo-edit/promo-edit.component';


@NgModule({
  declarations: [
    CarDetailComponent,
    DeliveryLocationEditComponent,
    MyLocationComponent,
    PromoEditComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CarDetailComponent
  ],
})
export class CarDetailModule { }
