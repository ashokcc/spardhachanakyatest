import { Component} from '@angular/core';
import {Router} from '@angular/router';
import {ForgotPwdPageSvc} from './forgotpwd.service';
import {AuthSvc} from './../common/auth';
import { LoginSvc } from '../login/login.service';

@Component({
  selector: 'app-forgot',
  templateUrl: 'forgotpwd.page.html',
  styleUrls: ['forgotpwd.page.scss'],
})
export class ForgotPwdPage{
  public email: any;
  public pwd: any;
  public code: any;
  public message: any;
  public isError: boolean = false;
  public emailSection: boolean = true;
  public codeSection: boolean = false;
  public pwdSection: boolean = false;
  
  constructor(public route:Router,
              public forgotPwdPageSvc:ForgotPwdPageSvc,
              public authSvc:AuthSvc,
              public loginSvc:LoginSvc,){}
  getCode(){
    this.forgotPwdPageSvc.getCode({email:this.email}).subscribe((data:any)=>{
      this.emailSection = false;
      this.codeSection = true;
      this.pwdSection = false;
    });
  }
  submitCode(){
    this.emailSection = false;
    this.codeSection = false;
    this.pwdSection = true;
  }
  submitPwd(){
    this.loginSvc.login({email:this.email, password:this.pwd}).subscribe((data:any)=>{
      this.isError = false;
      if( data.data && data.data.type === 'student'){
        this.route.navigateByUrl('students/exams');
        this.authSvc.setUserDetails(data.data);
      }else if(data.data === "" && data.isError){
        this.isError = true; 
        this.route.navigateByUrl('login');
      }else{
        this.route.navigateByUrl('admin/exams');
        this.authSvc.setUserDetails(data.data);
      }
    });    
    this.route.navigateByUrl('login');

  }

}
