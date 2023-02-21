import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_DISTRICTS_BY_CITY, GET_WARDS_BY_DISTRICT, SEARCH_ADDRESS } from 'src/app/models/constance';
import { DistrictAddressResponse, LocationResponse, WardsAddressResponse } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class CarOwnerService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };

  constructor(private httpClient: HttpClient) { }

  getDistrictByAreaCode(areaCode: number): Observable<DistrictAddressResponse> {
    this.httpOptions.params = {
      city: areaCode
    };
    return this.httpClient.get<DistrictAddressResponse>(`${GET_DISTRICTS_BY_CITY}`, this.httpOptions);
  }

  getWardsByDistrict(districtCode: number): Observable<WardsAddressResponse> {
    this.httpOptions.params = {
      district: districtCode
    };
    return this.httpClient.get<WardsAddressResponse>(`${GET_WARDS_BY_DISTRICT}`, this.httpOptions);
  }

  searchAddress(address: string): Observable<LocationResponse> {
    this.httpOptions.params = {
      sdkMap: 2,
      address: address
    };
    return this.httpClient.get<LocationResponse>(`${SEARCH_ADDRESS}`, this.httpOptions);
  }
}
