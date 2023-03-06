import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  chart: any;

  now = new Date();
  tomorrow = new Date();


  constructor(private _formBuilder: FormBuilder) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit(): void {
    this.createChart();
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
    fromDate: new FormControl(this.now),
    toDate: new FormControl(this.tomorrow),
    option: ['0']
  });

  fetchData() {
    console.log("fetched data");
    const option = Number(this.dateRangeFormGroup.get('option')?.value);
    if (option === 0) {
      this.chart.data.datasets[0] = {
        label: "Doanh thu",
        data: ['1234567', '1234569', '1234967', '1239567', '1934567',
          '1234967', '1239567', '1244567'],
      };
      this.chart.update();
    } else {
      this.chart.data.datasets[0] = {
        label: "Tổng số chuyến",
        data: ['3', '3', '4', '1', '2',
          '4', '3', '3'],
      };
      this.chart.update();
    }
  }


}
