import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { timer, tap } from 'rxjs';
import { CustomerLoginDialogComponent } from 'src/app/shared/layout/customer-layout/customer-header/components/dialogs/customer-login-dialog/customer-login-dialog.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('signUp')
  signUpEleRef!: ElementRef
  isSuccessSignUp = false
  constructor(){
     
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
}
