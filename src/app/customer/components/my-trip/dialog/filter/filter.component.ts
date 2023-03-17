import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface FilterOption {
  label: string;
  value: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  @Input()
  type!: string;
  timeOptions: FilterOption[] = [
    {
      label: 'Thời gian đặt',
      value: '',
    },
    {
      label: 'Thời gian khởi hành',
      value: '',
    },
  ];
  tripOptions: FilterOption[] = [
    {
      label: 'Chuyến thuê',
      value: '',
    },
    {
      label: 'Chuyến cho thuê',
      value: '',
    },
  ];
  statusOptions: FilterOption[] = [
    {
      label: 'Chờ duyệt',
      value: '',
    },
    {
      label: 'Đã duyệt',
      value: '',
    },
    {
      label: 'Đã đặt cọc',
      value: '',
    },
    {
      label: 'Đã kết s',
      value: '',
    },
  ];
}
