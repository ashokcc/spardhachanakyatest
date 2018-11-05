import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterSvc} from './register.service'
import {AuthSvc} from './../common/auth'
import {FormBuilder, Validators, FormGroup, FormArray, FormControl, FormControlName} from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  public registerForm:FormGroup;
  public msg: any;
  constructor(public authSvc:AuthSvc, 
    public regSvc: RegisterSvc,
    public router: Router,
    public fb: FormBuilder
  ){
    this.registerForm = this.fb.group({
      username:['', [Validators.required, Validators.maxLength(20)]],
      email:['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      phone:['', [Validators.required, Validators.maxLength(15)]],
      password:['', [Validators.required, Validators.maxLength(15)]],
      type:['student']
    });
  }
  register(){
    if(this.registerForm.invalid){
      this.msg = 'Please enter valid details';
      return;
    }
    this.msg = '';
    this.regSvc.registerUser(this.registerForm.value).subscribe((data: any)=>{
      if(data.isError){
        this.msg = data.error;
        return;
      }else{
        this.authSvc.setUserDetails(data.data);  
        this.router.navigateByUrl('students');
      }
    })
  }
  navigateToLogin(){
    this.router.navigateByUrl('login');
  }
}
