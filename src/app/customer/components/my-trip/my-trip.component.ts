import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from './dialog/filter/filter.component';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent {
  isEmptyTrip: boolean = false
  constructor(private matDialog: MatDialog){

  }
  openFilterDialog(){
    this.matDialog.open(FilterComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
}
