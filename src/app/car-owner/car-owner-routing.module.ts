import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerComponent } from './car-owner.component';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  {
    path: '', component: CarOwnerComponent, children: [
      {
        path: 'register', component: CarRegisterComponent,
      },
      {
        path: 'register/Self-drive', component: RegisterFormComponent
      },
      {
        path: 'listing', component: CarListingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarOwnerRoutingModule { }
