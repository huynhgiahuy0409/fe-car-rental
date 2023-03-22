import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: StatisticsComponent
  }
];

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StatisticsModule { }
