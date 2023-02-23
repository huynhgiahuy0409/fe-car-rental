import {
  AfterViewChecked,
  AfterViewInit,
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
  itemsTemplateRef!: TemplateRef<any>;
  @ViewChild('imageCarouselList')
  list!: ElementRef<any>;
  @Input()
  items!: QueryList<any>;
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
  carouselItemView: any[] = [];
  remainderItems!: number;
  constructor() {}
  ngOnInit(): void {
    let duplicateNumber = this.specItems.length - 1;
    let preDuplicates = this.specItems.slice(1, this.specItems.length);
    let lastDuplicates = this.specItems.slice(0, duplicateNumber);
    this.carouselItemView.push(
      ...preDuplicates,
      ...this.specItems,
      ...lastDuplicates
    );
  }
  ngAfterViewInit() {
    this.firstIdx = this.specItems.length - 1;
    this.lastIdx = this.firstIdx + this.specItems.length - 1;
    this.recomputeResponsive();
    this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
    this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
  }
  processCarousel(passedIdx: number) {
    this.recomputeResponsive();
    this.currentIdx = passedIdx;
    let isAuto = false;
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      isAuto = true;
    }
    this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
    this.list.nativeElement.style.transitionDuration = `600ms`;
    let idxOfLastBlock = this.lastIdx - this.remainderItems;
    this.currentIdx =
      this.currentIdx >= idxOfLastBlock && this.currentIdx <= this.lastIdx
        ? idxOfLastBlock
        : this.currentIdx > this.lastIdx
        ? this.lastIdx + 1
        : this.currentIdx;
    this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
    this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
    setTimeout(() => {
      if (this.currentIdx === this.lastIdx + 1) {
        this.currentIdx = this.firstIdx;
        this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
        this.list.nativeElement.style.transitionDuration = `0ms`;
        this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
      }
    }, 600);
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
    this.listWidth = this.list.nativeElement.offsetWidth;
    this.itemWidth = this.list.nativeElement.firstChild.offsetWidth;
    this.itemsOfPart = this.listWidth / this.itemWidth;
    this.remainderItems = !this.isPerItemInStep
      ? this.specItems.length % this.itemsOfPart
      : 0;
    this.remainderItemWidth =
      this.itemWidth * (this.specItems.length % this.itemsOfPart);
    if (!this.isPerItemInStep) {
      this.step = this.itemsOfPart;
    }
    this.currentIdx = this.firstIdx;
  }
  preCarousel() {
    this.processCarousel(this.currentIdx - this.step);
  }
  nextCarousel() {
    this.processCarousel(this.currentIdx + this.step);
  }
}
