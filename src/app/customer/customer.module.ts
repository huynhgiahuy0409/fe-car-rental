import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { MaterialAngularModule } from '../material-angular/material-angular.module';


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
  ]
})
export class CustomerModule { }
