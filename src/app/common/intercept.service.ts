import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSvc } from './auth';

@Injectable()
export class CommonInterceptor implements HttpInterceptor{
    constructor(public authSvc:AuthSvc){}
    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{

        if(this.authSvc.getStorageData()){
            const reqCloned = req.clone({
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'token': this.authSvc.getStorageData()
                  })
            });
            return next.handle(reqCloned);
        }else{
            return next.handle(req);
        }

    }


}