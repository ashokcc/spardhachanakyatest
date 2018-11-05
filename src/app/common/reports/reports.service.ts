import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../common/constants';
import { AuthSvc } from './../auth';
@Injectable({providedIn:'root'})
export class ReportsSvc{
    public allReports: any;
    constructor(public http:HttpClient,
                public appConstants:AppConstants,
                public authSvc:AuthSvc){}

    getReports(){
        const objToSend = {
            'userType':this.authSvc.userType,
            'email':this.authSvc.email
        };        
        return this.http.post(`${this.appConstants.baseUrlApi}/getreports`, JSON.stringify(objToSend));
    }
}