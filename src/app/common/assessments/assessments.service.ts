import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConstants } from '../../common/constants';
import { AuthSvc } from '../../common/auth';

@Injectable({providedIn:'root'})
export class AssessmentsSvc{
    constructor(public http:HttpClient, 
        public authSvc:AuthSvc,
        public appConstants: AppConstants){}

    getAssessments(){
        return this.http.get(`${this.appConstants.baseUrlApi}/getassessments`);
    }
    submitAnswers(testTopic, id, questions){
        let objToSend = {
            email:this.authSvc.email,
            submittedBy:this.authSvc.userName,
            assessmentId:id,
            topic: testTopic,
            questions: questions
        };
        return this.http.post(`${this.appConstants.baseUrlApi}/submittest`, JSON.stringify(objToSend));
    }
}