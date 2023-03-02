import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MyLocationComponent } from '../my-location/my-location.component';

@Component({
  selector: 'app-delivery-location-edit',
  templateUrl: './delivery-location-edit.component.html',
  styleUrls: ['./delivery-location-edit.component.scss']
})
export class DeliveryLocationEditComponent {
  constructor(private matDialog: MatDialog){

  }
  chooseFromMap(){
    this.matDialog.open(MyLocationComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500,s'
    })
  }
}
