import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-favs',
  templateUrl: './my-favs.component.html',
  styleUrls: ['./my-favs.component.scss']
})
export class MyFavsComponent {
  modeType: 'wd' | 'sd' = 'sd'
  wdItems = [1,1,1,1]
  sdItems = [1,1,1,1,1,1]
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
