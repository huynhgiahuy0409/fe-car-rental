import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RouterModule } from '@angular/router';
import { CustomerLoginDialogComponent } from './customer-header/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { ForgetPasswordComponent } from './customer-header/components/dialogs/forget-password/forget-password.component';
import { SvgAsTemplateModule } from '../../svg-as-template/svg-as-template.module';
import { WheelSvgComponent } from '../../svg-as-template/wheel-svg/wheel-svg.component';
import { CustomerRoutingModule } from 'src/app/customer/customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
    CustomerLoginDialogComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    RouterModule,
    SvgAsTemplateModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
  ]
})
export class CustomerLayoutModule { }
