import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from '../car/car.component';
import { FindComponent } from './find.component';

const routes: Routes = [
  { path: '', component: FindComponent, children: [
  ]},
  { path: 'filter', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindRoutingModule {}
