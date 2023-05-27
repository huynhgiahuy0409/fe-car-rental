import { Observable } from 'rxjs';
import { CarDTO } from '../models/model';
import { CarResponse } from '../models/response/model';
import { FilterRequest } from './../models/request/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_API } from '../models/constance';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private _httpClient: HttpClient) { }

  public findAllCar(
    ownerId: number,
    filterRequest: FilterRequest
  ): Observable<CarResponse[]> {
    let url = URL_API.concat(`/api/cars/${ownerId}`);
    return this._httpClient.post<CarResponse[]>(url, filterRequest, {
      responseType: 'json',
    });
  }
  public findOne(carId: number, userId: number | null): Observable<CarResponse>{
    let params = new HttpParams();
    if(userId){
      params = params.set('userId', userId);
    }
    let url = URL_API.concat(`/api/cars/${carId}`);
    return this._httpClient.get<CarResponse>(url, {
      params: params,
      responseType: 'json',
    });
  }
}
