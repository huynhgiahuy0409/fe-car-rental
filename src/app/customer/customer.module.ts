import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';


@NgModule({
  declarations: [
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
  ]
})
export class CustomerModule { }
