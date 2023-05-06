import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RentalListingComponent } from './rental-listing.component';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';

const routes: Routes = [
  {
    path: '', component: RentalListingComponent,
  }
];


@NgModule({
  declarations: [
    RentalListingComponent,
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CarOwnerService
  ]
})
export class RentalListingModule { }
