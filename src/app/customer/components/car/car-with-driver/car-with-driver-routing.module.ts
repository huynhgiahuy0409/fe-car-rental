import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WD_MODE } from 'src/app/models/constance';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { CarWithDriverComponent } from './car-with-driver.component';

const routes: Routes = [
  {
    path: '',
    component: CarWithDriverComponent,
    children: [
      {
        path: ':product-name/:id',
        component: CarDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarWithDriverRoutingModule {}
