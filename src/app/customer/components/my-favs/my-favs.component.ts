import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-favs',
  templateUrl: './my-favs.component.html',
  styleUrls: ['./my-favs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyFavsComponent {
  modeType: 'wd' | 'sd' = 'sd'
  wdItems = [1,1,1,1]
  sdItems!: number[]
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
