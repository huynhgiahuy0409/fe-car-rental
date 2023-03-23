import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addHours, format, formatDuration, intervalToDuration } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RentalDetailsComponent {
  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder) { }

  rental_id: any;
  duration: any;
  timeLeft: any;
  locale: any;
  now: any;
  end: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rental_id = params['id'];
      console.log(this.rental_id);
    })

    setInterval(() => {
      this.duration = intervalToDuration({
        start: new Date(2023, 2, 6),
        end: addHours(new Date(), 1)
      })
      this.timeLeft = (formatDuration(this.duration, {
        delimiter: ', ',
        locale: vi
      }))
    }, 1000);

    this.locale = { vi: vi }
    this.now = format(new Date(), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
    this.end = format(new Date("2023/03/07"), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
  }

  formatMoney(money: number) {
    return getMoneyFormat(money);
  }

}
