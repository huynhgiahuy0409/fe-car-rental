import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/models/constance';
import { BehaviorSubject, Observable } from 'rxjs';
import { OTPType } from 'src/app/models/enum';
import {
  APIResponse,
  AuthenticationResponse,
} from 'src/app/models/response/model';
import { SignInRequest, SignUpRequest } from 'src/app/models/request/model';
import { JWTDTO } from 'src/app/models/model';
import { CookieService } from 'ngx-cookie-service';

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
  private registerUsernameBSub!: BehaviorSubject<string | null>;
  registerUsername$!: Observable<string | null>;
  private accessTokenBehaviorSubject!: BehaviorSubject<JWTDTO | null>;
  accessToken$!: Observable<JWTDTO | null>;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.registerUsernameBSub = new BehaviorSubject<string | null>(null);
    this.registerUsername$ = this.registerUsernameBSub.asObservable();

    this.accessTokenBehaviorSubject = new BehaviorSubject<JWTDTO | null>(null);
    this.accessToken$ = this.accessTokenBehaviorSubject.asObservable();
  }
  public nextRegisterUsername(username: string | null) {
    this.registerUsernameBSub.next(username);
  }
  public nexAccessToken(jwt: JWTDTO | null) {
    this.accessTokenBehaviorSubject.next(jwt);
  }
  public getAccessTokenCurrentValue() {
    return this.accessTokenBehaviorSubject.value;
  }
  get registerUsernameCurrentValue() {
    return this.registerUsernameBSub.value;
  }
  public getRefreshToken(){
    return this.cookieService.get('refresh-token')
  }
  public removeRefreshToken(){
    return this.cookieService.delete('refresh-token')
  }
  public signIn(
    signInRequest: SignInRequest
  ): Observable<APIResponse<AuthenticationResponse | string>> {
    let url = URL_API.concat('/api/auth/sign-in');
    return this.httpClient.post<APIResponse<AuthenticationResponse | string>>(
      url,
      signInRequest,
      this.httpOptions
    );
  }
  signOut(refreshToken: string): Observable<APIResponse<string>> {
    return this.httpClient.post<APIResponse<string>>(
      `${URL_API}/api/auth/revoke-token`,
      refreshToken,
      this.httpOptions
    );
  }
  storeRefreshToken(refreshToken: JWTDTO) {
    const { token, tokenExpirationDate } = refreshToken;
    this.cookieService.set(
      'refresh-token',
      token,
      tokenExpirationDate,
      '/',
      undefined,
      true,
      'Strict'
    );
  }

  refreshAccessToken(
    refreshToken: string
  ): Observable<APIResponse<AuthenticationResponse>> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + refreshToken);
    headers = headers.append('Content-Type', 'application/json');
    this.httpOptions.headers = headers;
    const url = `${URL_API}/api/auth/refresh-access-token`;
    return this.httpClient
      .get<APIResponse<AuthenticationResponse>>(url, this.httpOptions)
      .pipe();
  }

  public validateSignUp(
    signUpFormRequest: SignUpRequest
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
