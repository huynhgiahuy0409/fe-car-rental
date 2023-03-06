import { Component } from '@angular/core';

interface FilterOption{
  label: string,
  value: string
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  timeOptions: FilterOption[] = [
    {
      label: 'Thời gian đặt',
      value: ''
    },
    {
      label: 'Thời gian khởi hành',
      value: ''
    },
  ]
  tripOptions: FilterOption[] = [
    {
      label: 'Chuyến thuê',
      value: ''
    },
    {
      label: 'Chuyến cho thuê',
      value: ''
    },
  ]
  statusOptions: FilterOption[] = [
    {
      label: 'Chờ duyệt',
      value: ''
    },
    {
      label: 'Đã duyệt',
      value: ''
    },
    {
      label: 'Đã đặt cọc',
      value: ''
    },
    {
      label: 'Đã kết s',
      value: ''
    },
  ]
  
}
