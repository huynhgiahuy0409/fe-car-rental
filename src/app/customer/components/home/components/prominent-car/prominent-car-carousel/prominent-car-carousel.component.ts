import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarouselService } from 'src/app/customer/services/carousel.service';

@Component({
  selector: 'app-prominent-car-carousel',
  templateUrl: './prominent-car-carousel.component.html',
  styleUrls: ['./prominent-car-carousel.component.scss'],
  providers: [CarouselService]
})
export class ProminentCarCarouselComponent {
  @Input()
  itemList: any[] = [];
  @ViewChild('imageCarousel', { static: true })
  imageCarousel!: ElementRef<HTMLDivElement>;
  @Input()
  carouselDotsActive: boolean = false;
  @ViewChild('imageCarouselList', { static: true })
  imageCarouselList!: ElementRef<HTMLUListElement>;
  @ViewChildren('imageCarouselItem')
  imageCarouselItem!: QueryList<any>;
  sltIdx: number = 0;
  lastPartIdx!: number;
  isLastIdx: boolean = false;
  partNumberCarousel!: number;
  carouselParts!: number[];
  @Input()
  values!: number[];
  @Output()
  valueChange = new EventEmitter();
  valueInput: string = 'abc';
  @Input()
  number!: number;
  // color
  @Input()
  primaryClr!: string;
  @Input()
  secondaryClr!: string;
  carouselDotActive: any;
  carouselDotUnActive: any;
  constructor(public carouselService: CarouselService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.carouselDotActive = {
      background: this.primaryClr,
      border: `2px solid ${this.secondaryClr}`,
    };

    this.carouselDotUnActive = {
      background: this.primaryClr,
      opacity: `.2`,
    };
    this.carouselService.initCarousel(
      this.imageCarouselList,
      this.imageCarouselItem
    );
    this.carouselParts = new Array(this.partNumberCarousel);
  }
  processCarousel(action: '+' | '-') {
    this.sltIdx = this.carouselService.currentIdx;
    action === '+' ? this.sltIdx++ : this.sltIdx--;
    this.isLastIdx = this.sltIdx === this.lastPartIdx ? true : false;
    this.carouselService.processCarousel(this.sltIdx);
  }
  sltDotCarousel(idx: number) {
    this.carouselService.processCarousel(idx);
  }
}
