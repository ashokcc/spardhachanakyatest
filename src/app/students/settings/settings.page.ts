import { Component, OnInit} from '@angular/core';
import {AuthSvc} from './../../common/auth'
import {FormBuilder, Validators, FormGroup, FormArray, FormControl, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonAppSvc } from '../../common/common.service';
import {RegisterSvc} from '../../register/register.service'

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit{
  public email:any;
  public username: any;
  public isEdit: boolean = false;
  public updateForm: FormGroup;
  constructor(public authSvc: AuthSvc,
     public router: Router,
     public regSvc:RegisterSvc,
     public commonAppSvc: CommonAppSvc,
      public fb: FormBuilder){
        
      this.updateForm = this.fb.group({
          username:['', [Validators.required, Validators.maxLength(20)]],
          email:['', [Validators.required, Validators.email]],
          existingEmail:[''],
          phone:['', [Validators.required, Validators.maxLength(15)]],
          password:['', [Validators.required, Validators.maxLength(15)]],
          type:['student']
      });                
  }
  ngOnInit(){
    this.username = this.authSvc.userName;
    this.email = this.authSvc.email;
  }

  editUser(){
    this.isEdit = !this.isEdit;
  }

  updateDetails(){
    if(this.updateForm.invalid){
      this.commonAppSvc.presentToast('Please enter valid user details.', 'customToastBgError');
      return;
    }
    this.updateForm.value.existingEmail = this.authSvc.email;
    this.regSvc.updateUser(this.updateForm.value).subscribe((data: any)=>{
      if(data.isError){
        this.commonAppSvc.presentToast('Error in updating details', 'customToastBgError');
        return;
      }
      this.commonAppSvc.presentToast('Account has been updated.', 'customToastBg');
      this.isEdit = false;
      if(data.data){
        setTimeout(()=>{
          this.router.navigateByUrl('login');
        }, 3000);
      }
    });
  }
}
