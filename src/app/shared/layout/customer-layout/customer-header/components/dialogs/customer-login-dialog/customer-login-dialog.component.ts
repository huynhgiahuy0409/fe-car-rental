import { APIResponse, AuthenticationResponse } from './../../../../../../../models/response/model';
import { format } from 'date-fns';
import { ForgetPasswordComponent } from './../forget-password/forget-password.component';
import { tap, timer } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { AuthService } from 'src/app/customer/services/auth.service';
import { SignInRequest } from 'src/app/models/request/model';
import { UserService } from 'src/app/customer/services/user.service';

@Component({
  selector: 'app-customer-login-dialog',
  templateUrl: './customer-login-dialog.component.html',
  styleUrls: ['./customer-login-dialog.component.scss'],
})
export class CustomerLoginDialogComponent {
  signInFG!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<CustomerLoginDialogComponent>,
    private matDialog: MatDialog,
    private _fb: FormBuilder,
    public progressBarService: ProgressBarService,
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.signInFG = this._fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }
  get usernameControl(): FormControl {
    return this.signInFG.get('username') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signInFG.get('password') as FormControl;
  }
  onClickSignIn(formValue: SignInRequest) {
    this._authService
      .signIn(formValue)
      .pipe(tap((signInResponse) => {
        const {statusCode} = signInResponse
        if(statusCode == 200){
          const {data} = signInResponse as APIResponse<AuthenticationResponse>
          signInResponse as APIResponse<AuthenticationResponse>
          this._userService.nextUser(data.user)
          this._authService.nexAccessToken(data.accessToken)
          this._authService.storeRefreshToken(data.refreshToken)
          this.dialogRef.close()
        }else if(statusCode == 400){

        }else{

        }
      }))
      .subscribe();
  }
}
