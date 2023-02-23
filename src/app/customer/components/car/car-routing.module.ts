import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';


const routes: Routes = [
  {
    path: '',
    component: CarComponent,
    children: [
        { path: '', loadChildren: () => import('./car-self-driving/car-self-driving.module').then(m => m.CarSelfDrivingModule) },
        { path: 'wd', loadChildren: () => import('./car-with-driver/car-with-driver.module').then(m => m.CarWithDriverModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}
