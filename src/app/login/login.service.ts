import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../common/constants';
import { AuthSvc } from '../common/auth';
@Injectable({
    providedIn:'root'
})
export class LoginSvc{
    constructor(public http: HttpClient, 
        public authSvc:AuthSvc,
        public appConstants:AppConstants){}
    login(data){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        let body = JSON.stringify(data);
        return this.http.post(`${this.appConstants.baseUrlApi}/login`, body, httpOptions);
    }
    logout(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'token':this.authSvc.token
            })
        };
        return this.http.post(`${this.appConstants.baseUrlApi}/logout`, httpOptions);
    }
    testResultsData(){
        let data = {
            "isError":false,
            "error":"",
            "success":"Assessment query runs successfully",
            "data":{
                "testResults":{
                    "topic":"Ashok Test",
                    "assessmentId":"5ba7ccafcab8841b5c09ef62",
                    "testId":"5ba7d744934fa60e2c31c21b",
                    "testCompletedDate":"2018-09-23T18:11:16.560Z",
                    "correctAnswers":2,
                    "wrongAnswers":0,
                    "results":[
                        {
                            "question":"Whats the result of 2+2 ?",
                            "options":[
                                {"_id":"5ba7ccafcab8841b5c09ef6c","option":"22"},
                                {"_id":"5ba7ccafcab8841b5c09ef6b","option":"2"},
                                {"_id":"5ba7ccafcab8841b5c09ef6a","option":"4"},
                                {"_id":"5ba7ccafcab8841b5c09ef69","option":"3"}
                            ],
                            "correctAnswer":"4",
                            "selectedOption":"4"
                        },
                        {
                            "question":"Result of 12*12 ?",
                            "options":[
                                {"_id":"5ba7ccafcab8841b5c09ef67","option":"24"},
                                {"_id":"5ba7ccafcab8841b5c09ef66","option":"144"},
                                {"_id":"5ba7ccafcab8841b5c09ef65","option":"120"},
                                {"_id":"5ba7ccafcab8841b5c09ef64","option":"100"}
                            ],
                            "correctAnswer":"144",
                            "selectedOption":"144"
                        }
                    ]
                }
            }
        };
        return data.data.testResults;
    }
}