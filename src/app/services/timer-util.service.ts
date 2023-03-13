import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerUtilService {
 // 24 hours options just h:00
  hrs: string[] = []; // default
  // 48 hours include h:00 & h:30
  startAndReturnHrOptions: { label: string; value: number }[] = []; // rental and return car
  constructor() {
    this._setStartAndReturnHrOpts()
  }
  private _setStartAndReturnHrOpts() {
    for (let i = 0; i <= 23; i++) {
      let minutesOps = ['00', '30'];
      minutesOps.forEach((m) => {
        let tempValue = i * 3600000;
        if (m === '30') {
          tempValue += 1800000;
        }
        this.startAndReturnHrOptions.push({
          label: `${i}:${m}`,
          value: tempValue,
        });
      });
    }
  }
  formatTime(date: Date): string{
    return date.getHours() + ":" + date.getMinutes() + ""
  }
  formatDate(date: Date): string{
    return date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear() +  ""
  }
}
