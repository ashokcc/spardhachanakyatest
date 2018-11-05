import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConstants } from '../../common/constants';

@Injectable({providedIn:'root'})
export class AdminStudentsSvc{
    constructor(public http:HttpClient, 
        public appConstants:AppConstants){}

    getStudents(){
        return this.http.get(`${this.appConstants.baseUrlApi}/allstudents`);
    }

}