import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from 'src/app/customer/services/carousel.service';

@Component({
  selector: 'app-prominent-place',
  templateUrl: './prominent-place.component.html',
  styleUrls: ['./prominent-place.component.scss'],
})
export class ProminentPlaceComponent {
  @Input()
  primaryClr!: string
  @Input()
  secondaryClr!: string
  @Input()
  tertiaryClr!: string
  
 categories: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  setDestinationSltBgClr(): string{
    return `linear-gradient(180deg,#fff 0,#fff 54%,${this.tertiaryClr} 0,${this.tertiaryClr})`
  }
}
