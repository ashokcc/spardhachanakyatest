import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConstants } from '../../common/constants';
import { AuthSvc } from '../../common/auth';

@Injectable({providedIn:'root'})
export class CreateAssessmentSvc{
    constructor(public http:HttpClient, 
        public authSvc:AuthSvc,
        public appConstants:AppConstants){}

    createAssessment(questions){
        let body = JSON.stringify(questions);
        return this.http.post(`${this.appConstants.baseUrlApi}/createassessment`, body);
    }

}