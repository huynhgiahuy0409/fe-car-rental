import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProminentCarComponent } from './prominent-car.component';
import { ProminentCarCarouselComponent } from './prominent-car-carousel/prominent-car-carousel.component';



@NgModule({
  declarations: [
    ProminentCarComponent,
    ProminentCarCarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProminentCarComponent,
    ProminentCarCarouselComponent
  ],
})
export class ProminentCarModule { }
