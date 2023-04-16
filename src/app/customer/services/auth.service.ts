import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/models/constance';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUpFormRequest } from 'src/app/models/request/auth';
import { APIResponse } from 'src/app/models/model';
import { OTPType } from 'src/app/models/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      responseType: 'json',
    }),
    params: new HttpParams(),
  };
  private registerUsernameBSub!: BehaviorSubject<string | null>
  registerUsername$!: Observable<string | null>
  constructor(private httpClient: HttpClient) {
    this.registerUsernameBSub = new BehaviorSubject<string | null>(null)
    this.registerUsername$ = this.registerUsernameBSub.asObservable()
  }
  public nextRegisterUsername(username: string | null){
    this.registerUsernameBSub.next(username)
  }
  get registerUsernameCurrentValue(){
    return this.registerUsernameBSub.value
  }
  public validateSignUp(
    signUpFormRequest: SignUpFormRequest
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat('/api/auth/validate-sign-up');
    return this.httpClient.post<APIResponse<string>>(
      url,
      signUpFormRequest,
      this.httpOptions
    );
  }
  public generateMailOTP(
    username: string,
    OTPType: OTPType
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat('/api/otp/generate-otp');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('username', username)
      .set('otpType', OTPType);
    return this.httpClient.get<APIResponse<string>>(url, {
      headers: headers,
      params: params,
      responseType: 'json',
    });
  }
  public validateMailOTP(
    username: string,
    OTPNumber: number,
    OTPType: OTPType
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat('/api/otp/validate-otp');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('username', username)
      .set('OTPNumber', OTPNumber)
      .set('otpType', OTPType);
    return this.httpClient.get<APIResponse<string>>(url, {
      headers: headers,
      params: params,
      responseType: 'json',
    });
  }
}
