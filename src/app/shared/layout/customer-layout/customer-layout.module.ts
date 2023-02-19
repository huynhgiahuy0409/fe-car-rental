import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RouterModule } from '@angular/router';
import { CustomerLoginDialogComponent } from './customer-header/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { ForgetPasswordComponent } from './customer-header/components/dialogs/forget-password/forget-password.component';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
    CustomerLoginDialogComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    RouterModule
  ],
  exports: [
    CustomerHeaderComponent,
    CustomerFooterComponent,

  ]
})
export class CustomerLayoutModule { }
