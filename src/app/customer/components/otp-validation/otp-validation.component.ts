import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OTPType } from 'src/app/models/enum';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss'],
})
export class OtpValidationComponent implements OnInit {
  otpForm: FormGroup;
  username!: string;
  otpType!: string | null;
  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _matDialog: MatDialog,
    private _router: Router
  ) {
    this.otpForm = this._fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this._authService.registerUsernameCurrentValue) {
      this.username = this._authService.registerUsernameCurrentValue;
    } else {
      window.history.back();
    }
    this.otpType = this._activatedRoute.snapshot.paramMap.get('type');
  }

  onPaste(event: any) {
    const clipboardData = event.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const inputs: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[type="text"]');
      inputs.forEach((input, i) => {
        input.value = pastedData[i];
        this.otpForm.get(`digit` + (i + 1))?.patchValue(pastedData[i]);
      });
    }
    console.log(this.otpForm.value);
  }
  onSubmitMailOTP(username: string, otpForm: FormGroup) {
    const otpArr: number[] = Object.values(otpForm.getRawValue());
    let otpNumberText: string = otpArr.join().replaceAll(',', '');
    let otpType: OTPType;
    if (this.otpType === 'register') {
      otpType = OTPType.REGISTER;
    } else {
      otpType = OTPType.FORGET_PASSWORD;
    }
    this._authService
      .validateMailOTP(username, Number.parseInt(otpNumberText), otpType)
      .pipe(
        tap((otpValidationStatusResponse) => {
          const { data, statusCode } = otpValidationStatusResponse;
          if (statusCode === 200) {
            if (this.otpType === 'register') {
              let dataDialog = {
                title: 'Đăng ký thành công',
                message: data,
                navigatePages: ['home', 'login'],
              };
              this.openValidateStatusDialog(MessageDialogComponent, dataDialog)
                .afterClosed()
                .subscribe((_) => {
                  this._router.navigate(['/home']);
                });
            } else {
              otpType = OTPType.FORGET_PASSWORD;
            }
          } else {
            let dataDialog = {
              title: 'Đăng ký thành công',
              message: data,
              navigatePages: ['close'],
            };
            this.openValidateStatusDialog(MessageDialogComponent, dataDialog);
          }
        })
      )
      .subscribe();
  }
  openValidateStatusDialog(
    component: ComponentType<any>,
    data: any
  ): MatDialogRef<any> {
    return this._matDialog.open(component, {
      minWidth: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: data,
    });
  }
}
