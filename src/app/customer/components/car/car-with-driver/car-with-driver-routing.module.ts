import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarWithDriverComponent } from './car-with-driver.component';

const routes: Routes = [{ path: '', component: CarWithDriverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarWithDriverRoutingModule { }
