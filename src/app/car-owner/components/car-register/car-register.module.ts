import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarRegisterComponent } from './car-register.component';

const routes: Routes = [
  {
    path: '', component: CarRegisterComponent
  }
];

@NgModule({
  declarations: [CarRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CarRegisterModule { }
