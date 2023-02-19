import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProminentPlaceComponent } from './prominent-place.component';
import { DestinationCarouselComponent } from './destination-carousel/destination-carousel.component';
import { AirportCarouselComponent } from './airport-carousel/airport-carousel.component';



@NgModule({
  declarations: [
    ProminentPlaceComponent,
    DestinationCarouselComponent,
    AirportCarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProminentPlaceComponent
  ]
})
export class ProminentPlaceModule { }
