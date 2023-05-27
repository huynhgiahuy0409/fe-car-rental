import { Injectable } from '@angular/core';
import { UserTripResponse } from '../models/response/model';
import { Observable } from 'rxjs';
import { URL_API } from '../models/constance';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {

  constructor(private _httpClient: HttpClient) { }

  public findUserTrip(
    userId: number
  ): Observable<UserTripResponse> {
    let url = URL_API.concat(`/api/rentals/${userId}`);
    return this._httpClient.get<UserTripResponse>(url, {
      responseType: 'json',
    });
  }
}
