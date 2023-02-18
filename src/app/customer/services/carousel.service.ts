import { ElementRef, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  isConstructView: boolean = false;
  private carouselList!: ElementRef<HTMLUListElement>;
  private carouselItems!: QueryList<any>;
  currentPartIdx = 0;
  lastPartIndx!: number;
  isLastIdx: boolean = false;
  private carouselIntervalId!: any;
  nextCarouselTime: number = 5000;
  private totalItem: number = 0;
  private curIdxSubject!: BehaviorSubject<number>;
  curIdx$: Observable<number>;
  private timer!: number;
  private remainderItemWidth: number = 0;
  carouselPartNumber!: number
  constructor() {
    this.curIdxSubject = new BehaviorSubject<number>(0);
    this.curIdx$ = this.curIdxSubject.asObservable();
  }
  ngOnInit(): void {}
  initCarousel(
    imageCarouselList: ElementRef<HTMLUListElement>,
    imageCarouselItem: QueryList<any>,
    ms?: number
  ) {
    /*

    */
    this.isConstructView = true;
    this.carouselList = imageCarouselList;
    this.carouselItems = imageCarouselItem;
    this.totalItem = this.carouselItems.length;
    /*
      if init service is passed ms value 
      => set interval to auto next part
    */
    if (ms) {
      this.timer = ms;
      this.carouselIntervalId = setInterval(() => {
        this.currentPartIdx++;
        this.processCarousel(this.currentPartIdx);
      }, ms);
    }
    this.recomputeResponsive();
  }
  processCarousel(sltIdx: number) {
    console.log(sltIdx);
    console.log(this.currentPartIdx);
    
    this.recomputeResponsive();
    if (sltIdx < 0) {
      this.currentPartIdx = this.lastPartIndx;
    } else if (sltIdx > this.lastPartIndx) {
      this.currentPartIdx = 0;
    } else {
      this.currentPartIdx = sltIdx;
    }
    let isAuto = false;
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      isAuto = true;
    }
    let positionX = -this.currentPartIdx * 100;
    if (this.currentPartIdx === this.lastPartIndx) {
      if (this.remainderItemWidth != 0) {
        positionX = -(this.currentPartIdx - 1) * 100;
        this.carouselList.nativeElement.style.transform = `translateX(calc(${positionX}% - ${this.remainderItemWidth}px))`;
      } else {
        this.carouselList.nativeElement.style.transform = `translateX(${positionX}%)`;
      }
    } else {
      this.carouselList.nativeElement.style.transform = `translateX(${positionX}%)`;
    }
    if (isAuto) {
      this.carouselIntervalId = setInterval(() => {
        this.currentPartIdx++;
        this.processCarousel(this.currentPartIdx);
      }, this.timer);
    }
  }
  isCarouselListExist(): boolean {
    return this.carouselList ? true : false;
  }
  isCarouselItemExist(): boolean {
    return this.carouselItems ? true : false;
  }
  get getCurIdx() {
    return this.currentPartIdx;
  }
  /*
    Description: Method re-get width and height of list and first item (same each item in list)
    after user resize web
    - compute truth width = length of number of item
    - check remainder
    - compute part number of carousel
    */
  recomputeResponsive(){
    let listWidth = this.carouselList.nativeElement.offsetWidth;
    let itemWidth = this.carouselItems.first.nativeElement.offsetWidth;
    let totalListWidth = itemWidth * this.totalItem;
    this.remainderItemWidth = totalListWidth % listWidth;
    this.carouselPartNumber = this.remainderItemWidth === 0 ? Math.floor(totalListWidth / listWidth) :  Math.floor(totalListWidth / listWidth) + 1
    this.lastPartIndx =this.carouselPartNumber - 1
  }
}
