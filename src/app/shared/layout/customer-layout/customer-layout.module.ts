import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerHeaderComponent,
    CustomerFooterComponent
  ]
})
export class CustomerLayoutModule { }
