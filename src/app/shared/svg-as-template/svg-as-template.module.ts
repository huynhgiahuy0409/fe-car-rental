import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelSvgComponent } from './wheel-svg/wheel-svg.component';



@NgModule({
  declarations: [
    WheelSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WheelSvgComponent
  ]
})
export class SvgAsTemplateModule { }
