import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { UploadFileService } from '../../services/upload-file.service';
import { RegisterFormComponent } from './register-form.component';

const routes: Routes = [
  {
    path: '', component: RegisterFormComponent
  }
];


@NgModule({
  declarations: [
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UploadFileService
  ]
})
export class RegisterFormModule { }
