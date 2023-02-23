import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProminentCarComponent } from './prominent-car.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';



@NgModule({
  declarations: [
    ProminentCarComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [
    ProminentCarComponent,
  ],
})
export class ProminentCarModule { }
