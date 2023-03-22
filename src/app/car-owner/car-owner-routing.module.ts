import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerComponent } from './car-owner.component';
import { CalendarsComponent } from './components/calendars/calendars.component';
import { CarListingComponent } from './components/car-listing/car-listing.component';
import { ContractComponent } from './components/contract/contract.component';

const routes: Routes = [
  {
    path: '', component: CarOwnerComponent, children: [
      {
        path: 'register', loadChildren: () => import('./components/car-register/car-register.module').then(m => m.CarRegisterModule)
      },
      {
        path: 'register/Self-drive', loadChildren: () => import('./components/register-form/register-form.module').then(m => m.RegisterFormModule)
      },
      {
        path: 'car-listing', component: CarListingComponent
      },
      {
        path: 'calendars', component: CalendarsComponent
      },
      {
        path: 'contract', component: ContractComponent
      },
      {
        path: 'statistics', loadChildren: () => import('./components/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: "rental-listing", loadChildren: () => import('./components/rental/rental.module').then(m => m.RentalModule)
      },
      {
        path: 'car-listing/:id', loadChildren: () => import("./components/car-management/car-management.module").then(m => m.CarManagementModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarOwnerRoutingModule { }
