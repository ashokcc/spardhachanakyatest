import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../common/constants';
@Injectable({
    providedIn:'root'
})
export class RegisterSvc{
    constructor(public http: HttpClient,
                public appConstants: AppConstants){}
    registerUser(data){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        let body = JSON.stringify(data);
        return this.http.post(`${this.appConstants.baseUrlApi}/register`, body, httpOptions);
    }
    updateUser(details){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        let body = JSON.stringify(details);        
        return this.http.post(`${this.appConstants.baseUrlApi}/updateuser`, body, httpOptions)
    }
}