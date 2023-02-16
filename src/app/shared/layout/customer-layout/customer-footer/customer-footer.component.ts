import { Component } from '@angular/core';
import { RedirectInfo } from 'src/app/models/model';


@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.scss']
})
export class CustomerFooterComponent {
  policies: RedirectInfo[] = [
    {
      label: 'Giới thiệu về Mioto',
      path: ''
    },
    {
      label: 'Chính sách và quy định',
      path: ''
    },
    {
      label: 'Quy chế hoạt động',
      path: ''
    },
    {
      label: 'Bảo mật thông tin',
      path: ''
    },
    {
      label: 'Giải quyết tranh chấp',
      path: ''
    },
  ]
  infoMores: RedirectInfo[] = [
    {
      label: 'Hướng dẫn chung',
      path: ''
    },
    {
      label: 'Hướng dẫn đặt xe',
      path: ''
    },
    {
      label: 'Hướng dẫn dành cho chủ xe',
      path: ''
    },
    {
      label: 'Hướng dẫn thanh toán',
      path: ''
    },
    {
      label: 'Tuyển dụng',
      path: ''
    },
  ]
  partners: RedirectInfo[] = [
    {
      label: 'Đăng ký chủ xe Mioto',
      path: ''
    },
    {
      label: 'Đăng ký Bảo hiểm vật chất & Bảo hiểm TNDS xe ô tô',
      path: ''
    },
  ]
}
