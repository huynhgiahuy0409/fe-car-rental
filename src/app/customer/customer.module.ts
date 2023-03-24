import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { MyFavsComponent } from './components/my-favs/my-favs.component';
import { SvgAsTemplateModule } from '../shared/svg-as-template/svg-as-template.module';
import { RouteReuseStrategy } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

@NgModule({
  declarations: [
    CustomerComponent,
    SignUpComponent,
    DemoComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule,
    SvgAsTemplateModule
  ],
})
export class CustomerModule { }
