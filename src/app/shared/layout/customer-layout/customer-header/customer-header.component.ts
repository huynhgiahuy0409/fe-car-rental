
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RedirectInfo } from 'src/app/models/model';
import { CustomerLoginDialogComponent } from '../../../../customer/components/auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { UserService } from 'src/app/customer/services/user.service';
import { AuthService } from 'src/app/customer/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent {
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
  ];
  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    private _authService: AuthService,
  ) {}
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
    if (this.dropdownMenuButton) {
      if (
        this.dropdownMenuButton.nativeElement.contains(event.target) &&
        this.activeUserMenu === false
      ) {
        this.activeUserMenu = true;
      } else {
        this.activeUserMenu = false;
      }
    }
    if (this.notifyMenuButton) {
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
  onClickSignOut() {
    let refreshToken = this._authService.getRefreshToken();
    if (refreshToken) {
      this._authService
        .signOut(refreshToken)
        .pipe(
          tap((response) => {
            const { data, statusCode } = response;
            if (statusCode === 200) {
              alert('Đăng xuất thành công');
              this._authService.nexAccessToken(null);
              this._authService.removeRefreshToken();
              this.userService.nextUser(null);
            } else {
              alert('Đăng xuất thất bại');
            }
          })
        )
        .subscribe();
    }
  }
}
