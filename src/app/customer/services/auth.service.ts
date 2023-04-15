import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/models/constance';
import { Observable } from 'rxjs';
import { SignUpFormRequest } from 'src/app/models/request/auth';
import { APIResponse } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      "responseType": "json"
    }),
    params: new HttpParams()
  }
  constructor(private httpClient: HttpClient) {
  }
  public validateSignUp(signUpFormRequest: SignUpFormRequest): Observable<APIResponse<string>>{
    let url = URL_API.concat("/api/auth/validate-sign-up")
    return this.httpClient.post<APIResponse<string>>(url, signUpFormRequest, this.httpOptions)
  }
  public generateMailOTP(username: string): Observable<APIResponse<string>>{
    let url = "http://localhost:8080/api/otp/generate-otp?username=18130094@st.hcmuaf.edu.vn"
    // this.httpOptions.params = params
    console.log(this.httpOptions)
    return this.httpClient.get<APIResponse<string>>(url)
  }
}
