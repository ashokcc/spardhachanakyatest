import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginSvc} from './login.service';
import {AuthSvc} from './../common/auth';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{
  public password: any;
  public email: any;
  public message: any;
  public isError: boolean = false;
  constructor(public route:Router,
              public loginSvc:LoginSvc,
              public authSvc:AuthSvc,
              public kb:Keyboard){}

  ngOnInit(){
    this.resetLogin();
  }
  resetLogin(){
    this.password = '';
    this.email = '';    
  }
  login(){

    this.loginSvc.login({email:this.email, password:this.password}).subscribe((data:any)=>{
      this.isError = false;
      if( data.data && data.data.type === 'student'){
        this.authSvc.setUserDetails(data.data);
        this.route.navigateByUrl('students/exams');
      }else if(data.data === "" && data.isError){
        this.isError = true; 
        this.route.navigateByUrl('login');
      }else{
        this.authSvc.setUserDetails(data.data);
        this.route.navigateByUrl('admin/exams');
      }
    });
  }

  navigateToRegister(){
    this.route.navigateByUrl('register');
  }

  navigateToForgotPage(){
    this.route.navigateByUrl('forgotpwd');
  }  
}
