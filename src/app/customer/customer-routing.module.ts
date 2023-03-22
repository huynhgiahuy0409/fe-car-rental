import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFavsComponent } from './components/my-favs/my-favs.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'car',
        loadChildren: () =>
          import('./components/car/car.module').then((m) => m.CarModule),
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'promo',
        loadChildren: () =>
          import('./components/promo/promo.module').then((m) => m.PromoModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./components/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      { path: 'my-trip', loadChildren: () => import('./components/my-trip/my-trip.module').then(m => m.MyTripModule) },
      { path: "find/filter", loadChildren: () => import("./components/search-result/search-result.module").then(m => m.SearchResultModule) },
      {
        path: 'my-favs', loadChildren: () => import("./components/my-favs/my-favs.module").then(m => m.MyFavsModule)
      },
      { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
