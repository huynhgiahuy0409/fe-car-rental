import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RedirectInfo } from 'src/app/models/model';
import { CustomerLoginDialogComponent } from './components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { UserService } from 'src/app/customer/services/user.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent{
  @ViewChild('dropdownMenuButton')
  dropdownMenuButton!: ElementRef;
  @ViewChild('notifyMenuButton')
  notifyMenuButton!: ElementRef;
  activeUserMenu: boolean = false;
  activeNotification: boolean = false;
  userMenus: RedirectInfo[] = [
    {
      label: 'Tài khoản',
      path: '/account',
    },
    {
      label: 'Xe yêu thích',
      path: '/my-favs',
    },
    {
      label: 'Xe của tôi',
      path: '',
    },
    {
      label: 'Chuyến của tôi',
      path: '/my-trip',
    },
    {
      label: 'Địa chỉ của tôi',
      path: '',
    },
    {
      label: 'Khuyến mãi',
      path: '/promo',
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
  constructor(public dialog: MatDialog, public userService: UserService ) {}
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
    if(this.dropdownMenuButton){
      if (
        this.dropdownMenuButton.nativeElement.contains(event.target) &&
        this.activeUserMenu === false
      ) {
        this.activeUserMenu = true;
      } else {
        this.activeUserMenu = false;
      }
    }
    if(this.notifyMenuButton){
      if (
        this.notifyMenuButton.nativeElement.contains(event.target) &&
        this.activeNotification === false
      ) {
        this.activeNotification = true;
      } else {
        this.activeNotification = false;
      }
    }
  }
}
