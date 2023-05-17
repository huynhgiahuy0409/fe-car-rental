import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import Chart from 'chart.js/auto';
import { CarOwnerService } from '../../services/car-owner.service';
import { CarOwnerStatResponse } from 'src/app/models/response/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { endOfMonth, startOfMonth } from 'date-fns';
import { CarOwnerChartDataRequest } from 'src/app/models/request/model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  chart: any;

  now = new Date();
  tomorrow = new Date();

  stats_information: CarOwnerStatResponse = {
    avgRating: 0,
    totalRevenue: 0,
    totalRental: 0,
    totalCar: 0,
    acceptedRentalRating: 0,
    cancelRentalRating: 0
  };


  constructor(private _formBuilder: FormBuilder, private carOwnerService: CarOwnerService) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit(): void {
    this.createChart();

    this.carOwnerService.getAllStatByOwner("hieu").subscribe(res => {
      this.stats_information = res;
    });
    this.fetchData();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Doanh thu",
            data: ['1234567', '1234569', '1234967', '1239567', '1934567',
              '1234967', '1239567', '1244567'],
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        showTooltips: true,
        scales: {
          y: {
            ticks: {
              // @ts-ignore
              beginAtZero: true,
              callback: function (value, index, values) {
                // @ts-ignore
                if (parseInt(value) >= 100000) {
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
                } else {
                  return value;
                }
              }
            },
          },
        },
      }
    });
  }

  dateRangeFormGroup = this._formBuilder.group({
    fromDate: new FormControl(startOfMonth(this.now)),
    toDate: new FormControl(endOfMonth(this.now)),
    option: ['0']
  });

  fetchData() {
    const option = Number(this.dateRangeFormGroup.get('option')?.value);
    const request: CarOwnerChartDataRequest = {
      username: "hieu",
      startDate: Number(this.dateRangeFormGroup.value.fromDate?.getTime()),
      endDate: Number(this.dateRangeFormGroup.value.toDate?.getTime()),
      category: option
    }

    this.carOwnerService.getChartData(request).subscribe(res => {
      this.chart.data = {
        labels: res.map(item => item.month + "/" + item.year),
        datasets: [
          {
            label: option === 0 ? "Doanh thu" : "Tổng số chuyến",
            data: res.map(item => item.value),
          }
        ]
      };
      this.chart.update();
    })
  }

  getMoneyFormat(value: number) {
    return getMoneyFormat(value);
  }

}
