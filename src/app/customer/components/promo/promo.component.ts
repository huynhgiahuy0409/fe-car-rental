import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { PromoDetailComponent } from './dialog/promo-detail/promo-detail.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent {
  constructor(private matDialog: MatDialog){

  }
  openPromoDetailDialog(){
    this.matDialog.open(PromoDetailComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
}
