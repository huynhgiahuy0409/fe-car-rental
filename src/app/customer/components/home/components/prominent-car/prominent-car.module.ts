import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProminentCarComponent } from './prominent-car.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';



@NgModule({
  declarations: [
    ProminentCarComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SvgAsTemplateModule
  ],
  exports: [
    ProminentCarComponent,
  ],
})
export class ProminentCarModule { }
