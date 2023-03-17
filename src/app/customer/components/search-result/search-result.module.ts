import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SearchResultModule { }
