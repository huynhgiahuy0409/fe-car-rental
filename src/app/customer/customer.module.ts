import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MyFavsComponent } from './components/my-favs/my-favs.component';

@NgModule({
  declarations: [
    CustomerComponent,
    SignUpComponent,
    MyFavsComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule
  ]
})
export class CustomerModule { }
