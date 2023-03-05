import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RedirectInfo } from 'src/app/models/model';
import { CustomerLoginDialogComponent } from './components/dialogs/customer-login-dialog/customer-login-dialog.component';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent {
  user: boolean = false;
  @ViewChild('dropdownMenuButton')
  dropdownMenuButton!: ElementRef
  activeUserMenu: boolean = false
  userMenus: RedirectInfo[] = [
    {
      label: 'Tài khoản',
      path: '',
    },
    {
      label: 'Xe yêu thích',
      path: '',
    },
    {
      label: 'Xe của tôi',
      path: '',
    },
    {
      label: 'Chuyến của tôi',
      path: '',
    },
    {
      label: 'Địa chỉ của tôi',
      path: '',
    },
    {
      label: 'Khuyến mãi',
      path: '',
    },
    {
      label: 'Đổi mật khẩu',
      path: '',
    },
    {
      label: 'Đăng xuất',
      path: '',
    },
  ];
  constructor(public dialog: MatDialog) {}
  openLoginFormDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CustomerLoginDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if(this.dropdownMenuButton.nativeElement.contains(event.target) && this.activeUserMenu === false){
      this.activeUserMenu = true
    }else{
      this.activeUserMenu = false
    }
  }
}
