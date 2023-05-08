import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RentalDetailsRoutingModule } from './details-routing.module';
import { RentalDetailsComponent } from './details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    RentalDetailsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RentalDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialAngularModule
  ]
})
export class RentalDetailsModule { }
