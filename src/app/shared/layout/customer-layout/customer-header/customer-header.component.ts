import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerLoginDialogComponent } from './components/dialogs/customer-login-dialog/customer-login-dialog.component';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent {
  constructor(public dialog: MatDialog){
    
  }
  openLoginFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomerLoginDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
