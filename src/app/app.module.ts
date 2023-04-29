import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MaterialAngularModule,
} from './material-angular/material-angular.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './customer/custom-route-reuse-strategy';
import { HttpClientModule } from '@angular/common/http';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { CoreModule } from './core/core.module';
import { OAUTH_CLIENT_ID } from './models/constance';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, MessageDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAngularModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
