import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalDetailsComponent } from './details.component';
import { RentalDetailsRoutingModule } from './details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';



@NgModule({
  declarations: [
    RentalDetailsComponent
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
