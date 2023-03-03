import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CarOwnerRoutingModule } from './car-owner-routing.module';
import { CarOwnerComponent } from './car-owner.component';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { CarOwnerService } from './services/car-owner.service';
import { UploadFileService } from './services/upload-file.service';

@NgModule({
  declarations: [
    CarOwnerComponent,
    NavbarComponent,
    CarRegisterComponent,
    RegisterFormComponent,
    CarListingComponent
  ],
  imports: [
    CommonModule,
    CarOwnerRoutingModule,
    CustomerLayoutModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule
  ],
  providers: [
    CarOwnerService,
    UploadFileService
  ]
})
export class CarOwnerModule { }
