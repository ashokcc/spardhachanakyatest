import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConstants} from '../../common/constants';

@Injectable({providedIn:'root'})
export class ReportSvc{
    constructor(public http:HttpClient,
        public appConstants:AppConstants){}
    getReport(id){
        return this.http.get(`${this.appConstants.baseUrlApi}/getreport/${id}`);
    }
}