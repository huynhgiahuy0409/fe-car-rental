import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from 'src/app/customer/services/carousel.service';

@Component({
  selector: 'app-destination-carousel',
  templateUrl: './destination-carousel.component.html',
  styleUrls: ['./destination-carousel.component.scss'],
  providers: [CarouselService]
})
export class DestinationCarouselComponent {
  @Input()@Input()
  itemList: any[] = [];
  @ViewChild('imageCarousel', { static: true })
  imageCarousel!: ElementRef<HTMLDivElement>;
  @Input()
  carouselDotsActive: boolean = false;
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  currentIdx: number = 0;
  lastPartIdx!: number
  isLastIdx: boolean = false
  partNumberCarousel!: number
  carouselParts!: number[]
  @Input()
  values!: number[]
  @Output()
  valueChange = new EventEmitter()
  valueInput: string = 'abc'
  @Input()
  number!: number
  // color
  @Input()
  primaryClr!: string
  constructor(public carouselService: CarouselService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.carouselService.initCarousel(
      this.imageCarouselList,
      this.imageCarouselItem
    );
    this.carouselParts = new Array(this.partNumberCarousel)
  }
  processCarousel(action: '+' | '-') {
    this.currentIdx = this.carouselService.currentIdx
    action === '+'? this.currentIdx++ : this.currentIdx--
    this.isLastIdx = this.currentIdx === this.lastPartIdx ? true : false
    this.carouselService.processCarousel(this.currentIdx)
  }
  sltDotCarousel(idx: number) {
    this.carouselService.processCarousel(idx)
  }
  setDestinationCarouselItemImageBefore(): string{
    return `linear-gradient(transparent,${this.primaryClr})`
  }
}
