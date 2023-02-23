import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { CarouselService } from 'src/app/customer/services/carousel.service';

@Component({
  selector: 'app-car-detail-cover-carousel',
  templateUrl: './car-detail-cover-carousel.component.html',
  styleUrls: ['./car-detail-cover-carousel.component.scss']
})
export class CarDetailCoverCarouselComponent {
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
  lastIdx!: number
  isLastIdx: boolean = false
  partNumberCarousel!: number
  carouselParts!: number[]
  fakeCurrentIdx!: number
  @Input()
  isOneStep!: boolean
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
    console.log(this.currentIdx);
    
  }
  
  ngOnInit(): void {
    let itemsOfPart = 3
    this.itemList.unshift(2,3,4)
    this.itemList.push(0,1,2)
  }
  ngAfterViewInit() {
    this.carouselService.initCarousel(
      this.imageCarouselList,
      this.imageCarouselItem,
      false  
    );
    this.currentIdx = this.carouselService.currentIdx
    this.lastIdx = this.carouselService.lastIdx
    this.imageCarouselItem = this.carouselService.carouselItems
    this.carouselParts = new Array(this.partNumberCarousel)
  }
  processCarousel(action: '+' | '-') {
    this.currentIdx = this.carouselService.currentIdx
    action === '+'? this.currentIdx++ : this.currentIdx--
    this.fakeCurrentIdx = this.currentIdx
    this.isLastIdx = this.currentIdx === this.lastIdx ? true : false
    this.carouselService.processCarousel(this.currentIdx)
    this.currentIdx = this.carouselService.currentIdx
  }
  sltDotCarousel(idx: number) {
    this.carouselService.processCarousel(idx)
  }
  setDestinationCarouselItemImageBefore(): string{
    return `linear-gradient(transparent,${this.primaryClr})`
  }
}
