import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent
  ],
  imports: [
    CommonModule,
    MaterialAngularModule
  ],
  exports: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
    
  ]
})
export class CustomerLayoutModule { }
