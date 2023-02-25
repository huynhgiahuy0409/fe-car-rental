import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetailComponent } from './car-detail.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';


@NgModule({
  declarations: [
    CarDetailComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [
    CarDetailComponent
  ],
})
export class CarDetailModule { }
