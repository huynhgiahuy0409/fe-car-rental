import { ElementRef, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  isConstructView: boolean = false;
  private carouselList!: ElementRef<HTMLUListElement>;
  carouselItems!: QueryList<any>;
  currentIdx = 0;
  private carouselIntervalId!: any;
  private totalItem: number = 0;
  private timer!: number;
  private remainderItemWidth: number = 0;
  listWidth!: number;
  itemWidth!: number;
  isPerItemInStep!: boolean;
  itemsOfPart!: number;
  step: number = 1;
  firstIdx!: number;
  lastIdx!: number;
  positionX!: number;
  constructor() {}
  ngOnInit(): void {}
  initCarousel(
    imageCarouselList: ElementRef<HTMLUListElement>,
    imageCarouselItem: QueryList<any>,
    isPerItemInStep?: boolean,
    ms?: number
  ) {
    this.isConstructView = true;
    this.carouselList = imageCarouselList;
    this.carouselItems = imageCarouselItem;
    this.totalItem = this.carouselItems.length;
    if (ms) {
      this.timer = ms;
      this.carouselIntervalId = setInterval(() => {
        this.currentIdx++;
        this.processCarousel(this.currentIdx);
      }, ms);
    }
    this.recomputeResponsive();
    this.firstIdx = this.itemsOfPart;
    this.lastIdx = this.totalItem - 1 - this.itemsOfPart;
    
    this.currentIdx = this.firstIdx;
    if (isPerItemInStep) {
      this.isPerItemInStep = isPerItemInStep;
    } else {
      this.step = this.itemsOfPart;
    }
    this.positionX =
      -(this.currentIdx - (this.step - 1)) *
      (100 / this.itemsOfPart) *
      this.step;
    this.carouselList.nativeElement.style.transform = `translateX(${this.positionX}%)`;
  }
  processCarousel(passedIdx: number) {
    let truthIdx = passedIdx + (this.step - 1);
    this.recomputeResponsive();
    console.log(this.remainderItemWidth);
    
    if (truthIdx < this.firstIdx) {
      this.currentIdx = this.lastIdx;
    } else if (truthIdx > this.lastIdx) {
      this.currentIdx = this.firstIdx;
    } else {
      this.currentIdx = truthIdx;
    }
    let isAuto = false;
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      isAuto = true;
    }
    this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
    if (truthIdx === this.lastIdx + 1) {
      let fakePositionX = -truthIdx * (100 / this.itemsOfPart);
      this.carouselList.nativeElement.style.transform = `translateX(${fakePositionX}%)`;
      this.carouselList.nativeElement.style.transitionDuration = `400ms`;
      setTimeout(() => {
        this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
        this.carouselList.nativeElement.style.transitionDuration = `0ms`;
        this.carouselList.nativeElement.style.transform = `translateX(${this.positionX}%)`;
      }, 400);
    } else {
      this.carouselList.nativeElement.style.transform = `translateX(${this.positionX}%)`;
      this.carouselList.nativeElement.style.transitionDuration = `400ms`;
      setTimeout(() => {
        this.carouselList.nativeElement.style.transitionDuration = `0ms`;
      }, 400);
    }
    // else {
    //   console.log('a');
    //   if (this.currentIdx === this.lastPartIndx) {
    //     if (this.remainderItemWidth != 0) {
    //       positionX = -(this.currentIdx - 1) * (100 / this.itemsOfPart);
    //       this.carouselList.nativeElement.style.transform = `translateX(calc(${positionX}% - ${this.remainderItemWidth}px))`;
    //     } else {
    //       this.carouselList.nativeElement.style.transform = `translateX(${positionX}%)`;
    //     }
    //   } else {
    //     this.carouselList.nativeElement.style.transform = `translateX(${positionX}%)`;
    //     this.carouselList.nativeElement.style.transitionDuration = `400ms`;
    //   }
    // }
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
    this.listWidth = this.carouselList.nativeElement.offsetWidth;
    this.itemWidth = this.carouselItems.first.nativeElement.offsetWidth;
    this.itemsOfPart = this.listWidth / this.itemWidth;
    let totalListWidth = this.itemWidth * this.totalItem;
    this.remainderItemWidth = totalListWidth % this.listWidth;
  }
}
