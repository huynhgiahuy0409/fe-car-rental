import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { EditPhoneComponent } from './dialog/edit-phone/edit-phone.component';
import { EditEmailComponent } from './dialog/edit-email/edit-email.component';
import { EditDrivingLicenseComponent } from './dialog/edit-driving-license/edit-driving-license.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { EditUserInfoComponent } from './dialog/edit-user-info/edit-user-info.component';


@NgModule({
  declarations: [
    AccountComponent,
    EditPhoneComponent,
    EditEmailComponent,
    EditDrivingLicenseComponent,
    EditUserInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialAngularModule
  ]
})
export class AccountModule { }
