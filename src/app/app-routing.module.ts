import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { CustomRouteReuseStrategy } from './customer/custom-route-reuse-strategy';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
      providers: [{
        provide: RouteReuseStrategy,
        useClass: CustomRouteReuseStrategy,
      },]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'car-owner',
    loadChildren: () =>
      import('./car-owner/car-owner.module').then((m) => m.CarOwnerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
