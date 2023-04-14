import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { timer, tap } from 'rxjs';
import { CustomerLoginDialogComponent } from 'src/app/shared/layout/customer-layout/customer-header/components/dialogs/customer-login-dialog/customer-login-dialog.component';
export function matchingPasswordsValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control: FormControl = formGroup.controls[controlName] as FormControl;
    const matchingControl: FormControl = formGroup.controls[matchingControlName] as FormControl;

    // set error on matching control if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ notMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$/;
    const valid = regex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }
  return null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  
})
export class SignUpComponent {
  @ViewChild('signUp')
  signUpEleRef!: ElementRef
  isSuccessSignUp = false
  signUpFG!: FormGroup
  constructor(private _fb: FormBuilder){
    this.signUpFG = this._fb.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, passwordValidator])],
        confirmPassword: ['', Validators.compose([Validators.required, passwordValidator])],
        fullName: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z\s]*$")])],
        phone: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      },
      {
        validators: matchingPasswordsValidator("password", "confirmPassword")
      }
    )
    this.signUpFG.valueChanges.subscribe(value => {
      console.log(value)
    })
    console.log(this.signUpFG.errors);
    
  }

  get usernameControl(): FormControl{
    return this.signUpFG.get('username') as FormControl
  }
  get passwordControl(): FormControl{
    return this.signUpFG.get('password')as FormControl
  }
  get confirmPasswordControl(): FormControl{
    return this.signUpFG.get('confirmPassword')as FormControl
  }

  onClickSignUp(){
    this.signUpEleRef.nativeElement.classList.add('loading')
    timer(2000).pipe(
      tap(_ => {
        setTimeout(() => {
          this.signUpEleRef.nativeElement.classList.add('active')
          this.isSuccessSignUp = true
        }, 2000);
      }),
    ).subscribe()
  }
  ngOnInit(): void {
    console.log("sign up init");
  }
  ngOnDestroy(){
    console.log("sign up des");
  }
}
