import { CarDetailModule } from './../car/car-detail/car-detail.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';


@NgModule({
  declarations: [
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    CarDetailModule
  ]
})
export class SearchResultModule { }
