import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cdjava-fe-booking-oto';

  constructor() {
  }

  ngOnInit(): void {
    this.checkSearchRoute();
  }

  checkSearchRoute() {
    let path = window.location.pathname;
    if (path.includes('/find/filter')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

}
