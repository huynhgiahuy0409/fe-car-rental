import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetailComponent } from './car-detail.component';
import { CarDetailCoverCarouselComponent } from './car-detail-cover-carousel/car-detail-cover-carousel.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';


@NgModule({
  declarations: [
    CarDetailComponent,
    CarDetailCoverCarouselComponent
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
