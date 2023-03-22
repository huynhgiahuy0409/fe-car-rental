import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-prominent-car',
  templateUrl: './prominent-car.component.html',
  styleUrls: ['./prominent-car.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProminentCarComponent {
  categories: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  constructor(private router: Router){}
  navigateCarDetail(){
    const navigationExtras: NavigationExtras = {
      state: {
        routeBy: 'bar'
      }
    }
    this.router.navigate(['car/huy/123'], navigationExtras);
  }
}
