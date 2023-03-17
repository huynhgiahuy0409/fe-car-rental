import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { CarSelfDrivingComponent } from './car-self-driving.component';

const routes: Routes = [
  {
    path: '', component: CarSelfDrivingComponent, children: [
      {
        path: ':product-name/:id', component: CarDetailComponent, data: {
          rentalModePath: 'sd'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarSelfDrivingRoutingModule { }
