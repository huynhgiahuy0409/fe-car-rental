import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input()
  specItems!: any[];
  @Input()
  dotRender!: TemplateRef<any>;
  @Input()
  itemRender!: TemplateRef<any>;
  @ViewChild('imageCarouselList')
  list!: ElementRef<any>;
  isConstructView: boolean = false;
  currentIdx = 0;
  carouselIntervalId!: any;
  totalItem: number = 0;
  timer!: number;
  remainderItemWidth: number = 0;
  listWidth!: number;
  itemWidth!: number;
  @Input()
  isPerItemInStep!: boolean;
  itemsOfPart!: number;
  step: number = 1;
  firstIdx!: number;
  lastIdx!: number;
  positionX!: number;
  remainderItems!: number;
  @Input()
  isActiveControl: boolean = true;
  @Input()
  isActiveDots: boolean = false;
  dotsView: number[] = [];
  @Input()
  isAutoActive: boolean = false
  lastBlockIdx!: number
  constructor(private ref:ChangeDetectorRef) {}
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
    this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
    this.listWidth = this.list.nativeElement.offsetWidth;
    this.itemWidth = this.list.nativeElement.firstChild.offsetWidth;
    this.itemsOfPart = this.listWidth / this.itemWidth;
    let specLength = this.specItems.length
    let preDuplicateItems = [...this.specItems].splice(specLength - this.itemsOfPart ,specLength)
    let lastDuplicateItems = [...this.specItems].splice(0, this.itemsOfPart)
    this.specItems.unshift(...preDuplicateItems)
    this.specItems.push(...lastDuplicateItems)
    this.ref.detectChanges();
    this.firstIdx = this.itemsOfPart;
    this.lastIdx = this.firstIdx + specLength - 1;
    this.step = this.isPerItemInStep === true? 1: this.itemsOfPart
    this.currentIdx = this.firstIdx
    this.lastBlockIdx = this.lastIdx - this.step + 1;
    this.remainderItems = !this.isPerItemInStep
      ? this.specItems.length % this.itemsOfPart
      : 0;
    this.remainderItemWidth =
      this.itemWidth * (this.specItems.length % this.itemsOfPart);
    let blockNumber = Math.floor(specLength / this.step);
    let dotsLength = this.remainderItems > 0 ? blockNumber + 1 : blockNumber;
    for (let index = 0; index < dotsLength; index++) {
      if(index === dotsLength - 1){
        this.dotsView.push(this.lastBlockIdx)
      }
      else{
        this.dotsView.push(index * this.step + this.itemsOfPart)
      }
    }
    // this.dotsView = 
    this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
    this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
    if(this.isAutoActive){
      setInterval(() => {
        this.processCarousel(this.currentIdx + this.step)
      }, 5000);
    }
  }
  processCarousel(passedIdx: number) {
    this.currentIdx = passedIdx;
    let isAuto = false;
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      isAuto = true;
    }
    if(this.firstIdx + this.remainderItems === this.currentIdx + this.step && !this.isPerItemInStep){
      this.currentIdx = this.firstIdx
    }
    this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
    this.list.nativeElement.style.transitionDuration = `500ms`;
    let lastBlockIdx = this.lastIdx - this.step + 1;
    this.currentIdx =
      this.currentIdx >= lastBlockIdx && this.currentIdx <= this.lastIdx
        ? lastBlockIdx
        : this.currentIdx > this.lastIdx
        ? this.lastIdx + 1
        : this.currentIdx < this.firstIdx
        ? this.firstIdx - this.step
        : this.currentIdx;
    this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
    this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
    setTimeout(() => {
      this.currentIdx = this.currentIdx === this.lastIdx + 1?  this.firstIdx : this.currentIdx < this.firstIdx? lastBlockIdx: this.currentIdx
      this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
      this.list.nativeElement.style.transitionDuration = `0ms`;
      this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
    }, 500);
    if (isAuto) {
      this.carouselIntervalId = setInterval(() => {
        this.currentIdx++;
        this.processCarousel(this.currentIdx);
      }, this.timer);
    }
  }

  /*
    Description: Method re-get width and height of list and first item (same each item in list)
    after user resize web
    - compute truth width = length of number of item
    - check remainder
    - compute part number of carousel
    */
  recomputeResponsive() {
    this.currentIdx = this.firstIdx;
    this.listWidth = this.list.nativeElement.offsetWidth;
    this.itemWidth = this.list.nativeElement.firstChild.offsetWidth;
    this.itemsOfPart = this.listWidth / this.itemWidth;
    
    this.step = this.isPerItemInStep === true? 1: this.itemsOfPart
    this.remainderItems = !this.isPerItemInStep
      ? this.specItems.length % this.itemsOfPart
      : 0;
    this.remainderItemWidth =
      this.itemWidth * (this.specItems.length % this.itemsOfPart);
    let specLength = this.specItems.length;
    let blockNumber = Math.floor(specLength / this.step);
    let dotsLength = this.remainderItems > 0 ? blockNumber + 1 : blockNumber;
    this.dotsView = new Array(dotsLength).fill(0);
  }
  preCarousel() {
    this.processCarousel(this.currentIdx - this.step);
  }
  nextCarousel() {
    this.processCarousel(this.currentIdx + this.step);
  }
  processDots(idx: number) {
    this.processCarousel(idx);
  }
}
