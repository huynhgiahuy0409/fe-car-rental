import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './components/banner/banner.component';
import { PromoComponent } from './components/promo/promo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProminentPlaceModule } from './components/prominent-place/prominent-place.module';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { OwnerComponent } from './components/owner/owner.component';
import { ProminentCarModule } from './components/prominent-car/prominent-car.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    PromoComponent,
    OwnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    ProminentPlaceModule,
    ProminentCarModule,
    MaterialAngularModule,
    HttpClientModule
  ]
})
export class HomeModule { }
