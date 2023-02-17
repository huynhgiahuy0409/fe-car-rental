import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerComponent } from './car-owner.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';

const routes: Routes = [
  {
    path: '', component: CarOwnerComponent, children: [
      {
        path: 'register', component: CarRegisterComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarOwnerRoutingModule { }
