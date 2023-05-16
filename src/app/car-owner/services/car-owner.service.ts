import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCEPT_RENTAL, COMPLETE_RENTAL, CONFIRM_DELIVERED_CAR_TO_RENTER, GET_ALL_BRAND, GET_ALL_CALENDAR, GET_ALL_DISTRICT_BY_PROVINCE, GET_ALL_FEATURE, GET_ALL_PROVINCE, GET_ALL_REGISTERED_CAR, GET_ALL_RENTAL_BY_OWNER, GET_ALL_WARD_BY_PROVINCE_DISTRICT, GET_MODEL_BY_BRAND, GET_RENTAL_DETAILS, REGISTER_NEW_CAR, REJECT_RENTAL, SEARCH_ADDRESS } from 'src/app/models/constance';
import { LocationResponse } from 'src/app/models/model';
import { CarRegisterRequest } from 'src/app/models/request/model';
import { BrandResponse, CalendarListingResponse, CarModelResponse, DistrictResponse, FeatureResponse, ProvinceResponse, RegisteredCarResponse, RentalDetailsResponse, RentalListingResponse, WardResponse } from 'src/app/models/response/model';

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

  getAllProvince(): Observable<ProvinceResponse[]> {
    return this.httpClient.get<ProvinceResponse[]>(`${GET_ALL_PROVINCE}`, this.httpOptions);
  }

  searchAddress(address: string): Observable<LocationResponse> {
    this.httpOptions.params = {
      sdkMap: 2,
      address: address
    };
    return this.httpClient.get<LocationResponse>(`${SEARCH_ADDRESS}`, this.httpOptions);
  }

  getBrands(): Observable<BrandResponse[]> {
    return this.httpClient.get<BrandResponse[]>(`${GET_ALL_BRAND}`, this.httpOptions);
  }

  getModelsByBrandId(id: number): Observable<CarModelResponse[]> {
    return this.httpClient.get<CarModelResponse[]>(`${GET_MODEL_BY_BRAND}/${id}`, this.httpOptions);
  }

  getAllFeature(): Observable<FeatureResponse[]> {
    return this.httpClient.get<FeatureResponse[]>(`${GET_ALL_FEATURE}`, this.httpOptions);
  }

  getDistrictByProvinceId(provinceId: number): Observable<DistrictResponse[]> {
    this.httpOptions.params = {
      provinceId: provinceId
    };
    return this.httpClient.get<DistrictResponse[]>(`${GET_ALL_DISTRICT_BY_PROVINCE}`, this.httpOptions);
  }
  getWardByProvinceAndDistrict(provinceId: number, districtId: number): Observable<WardResponse[]> {
    this.httpOptions.params = {
      provinceId: provinceId,
      districtId: districtId
    };
    return this.httpClient.get<WardResponse[]>(`${GET_ALL_WARD_BY_PROVINCE_DISTRICT}`, this.httpOptions);
  }

  registerNewCar(carRequest: CarRegisterRequest) {
    return this.httpClient.post(`${REGISTER_NEW_CAR}`, carRequest);
  }

  getAllRegisteredCar(username: string): Observable<RegisteredCarResponse[]> {
    this.httpOptions.params = {
      username: username
    };
    return this.httpClient.get<RegisteredCarResponse[]>(`${GET_ALL_REGISTERED_CAR}`, this.httpOptions);
  }

  getRentalListByOwner(username: string) {
    this.httpOptions.params = {
      username: username
    };
    return this.httpClient.get<RentalListingResponse[]>(`${GET_ALL_RENTAL_BY_OWNER}`, this.httpOptions);
  }

  getRentalDetailsById(id: number): Observable<RentalDetailsResponse> {
    this.httpOptions.params = {
      id: id
    };
    return this.httpClient.get<RentalDetailsResponse>(`${GET_RENTAL_DETAILS}`, this.httpOptions);
  }

  acceptRental(id: number, modifiedBy: string) {
    return this.httpClient.post(`${ACCEPT_RENTAL}`, { id, modifiedBy });
  }

  rejectRental(id: number, modifiedBy: string) {
    return this.httpClient.post(`${REJECT_RENTAL}`, { id, modifiedBy });
  }

  confirmDeliveredCarToRenter(id: number, modifiedBy: string) {
    return this.httpClient.post(`${CONFIRM_DELIVERED_CAR_TO_RENTER}`, { id, modifiedBy });
  }

  completeRental(id: number, modifiedBy: string) {
    return this.httpClient.post(`${COMPLETE_RENTAL}`, { id, modifiedBy });
  }

  getAllCalendar(username: string) {
    this.httpOptions.params = {
      username: username
    };
    return this.httpClient.get<CalendarListingResponse[]>(`${GET_ALL_CALENDAR}`, this.httpOptions);
  }
}
