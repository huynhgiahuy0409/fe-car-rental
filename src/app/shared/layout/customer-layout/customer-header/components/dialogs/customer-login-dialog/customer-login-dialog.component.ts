import { ForgetPasswordComponent } from './../forget-password/forget-password.component';
import { tap, timer } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-login-dialog',
  templateUrl: './customer-login-dialog.component.html',
  styleUrls: ['./customer-login-dialog.component.scss']
})
export class CustomerLoginDialogComponent {
  @ViewChild('login')
  loginEleRef!: ElementRef
  constructor(private dialogRef: MatDialogRef<CustomerLoginDialogComponent>, private matDialog: MatDialog){
     
  }

  onClickLogin(){
    this.loginEleRef.nativeElement.classList.add('loading')
    
    timer(2000).pipe(
      tap(_ => {
        this.loginEleRef.nativeElement.classList.add('active')
        setTimeout(() => {
          this.dialogRef.close()
        }, 2000);
      }),
    ).subscribe()
  }
  
  onClickForgetPassword(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.matDialog.open(ForgetPasswordComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
