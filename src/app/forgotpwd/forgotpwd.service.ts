import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../common/constants';
import { AuthSvc } from '../common/auth';
@Injectable({
    providedIn:'root'
})
export class ForgotPwdPageSvc{
    constructor(public http: HttpClient, 
        public authSvc:AuthSvc,
        public appConstants:AppConstants){}
    getCode(data){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        let body = JSON.stringify(data);
        return this.http.post(`${this.appConstants.baseUrlApi}/forgotpwd`, body, httpOptions);
    }
}