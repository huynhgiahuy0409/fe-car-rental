import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MyFavsComponent } from './components/my-favs/my-favs.component';
import { SvgAsTemplateModule } from '../shared/svg-as-template/svg-as-template.module';

@NgModule({
  declarations: [
    CustomerComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule,
    SvgAsTemplateModule
  ]
})
export class CustomerModule { }
