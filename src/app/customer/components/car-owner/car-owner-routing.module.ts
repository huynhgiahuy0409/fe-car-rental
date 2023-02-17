import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerComponent } from './car-owner.component';

const routes: Routes = [
  {
    path: '', component: CarOwnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarOwnerRoutingModule { }
