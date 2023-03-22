import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  isFavoriteCar: boolean = false
  activeDot!: any
  unActiveDot!:any
  @ViewChild("coverCarousel")
  coverCarousel!: CarouselComponent
  sltDot(idx: number){
    this.coverCarousel.processDots(idx)
  }
}
