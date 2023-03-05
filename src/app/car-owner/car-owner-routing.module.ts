import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerComponent } from './car-owner.component';
import { CalendarsComponent } from './components/calendars/calendars.component';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { ContractComponent } from './components/contract/contract.component';
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
      },
      {
        path: 'calendars', component: CalendarsComponent
      },
      {
        path: 'contract', component: ContractComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarOwnerRoutingModule { }
