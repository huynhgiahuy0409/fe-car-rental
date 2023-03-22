import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListingComponent } from './car-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '', component: CarListingComponent
  },
  {
    path: ':id', loadChildren: () => import("../car-management/car-management.module").then(m => m.CarManagementModule)
  }
];


@NgModule({
  declarations: [
    CarListingComponent
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CarListingModule { }
