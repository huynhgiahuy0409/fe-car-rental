import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('CAR DESSSSSS');
  }
  ngOnInit(): void {
    console.log('CAR INITTTTT');
  }
  
}
