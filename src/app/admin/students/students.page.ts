import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators, FormGroup, FormArray, FormControl, FormControlName} from '@angular/forms';
import {AdminStudentsSvc} from './students.service';
import {AuthSvc} from '../../common/auth'
import {RegisterSvc} from '../../register/register.service'
import {CommonAppSvc} from '../../common/common.service';

@Component({
  selector: 'students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
})
export class StudentsPage implements OnInit{
  public students: any = [];
  public registerForm:FormGroup;

  public isAdduser: boolean = false;
  constructor(public adminStudentsSvc:AdminStudentsSvc,
              public regSvc: RegisterSvc,
              public commonAppSvc: CommonAppSvc,
              public router: Router,
              public fb: FormBuilder){
    this.registerForm = this.fb.group({
      username:['', [Validators.required, Validators.maxLength(20)]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required, Validators.maxLength(15)]],
      password:['', [Validators.required, Validators.maxLength(15)]],
      type:['student']
    });                
  }

  ngOnInit(){
    this.adminStudentsSvc.getStudents().subscribe((_data: any)=>{
      this.students = _data.data;
    });
  }
  addUser(){
    this.isAdduser = !this.isAdduser;
  }
  submitUser(){
    if(this.registerForm.invalid){
      this.commonAppSvc.presentToast('Please enter valid user details.', 'customToastBgError');
      return;
    }
    this.regSvc.registerUser(this.registerForm.value).subscribe((data: any)=>{
      if(data.isError){
        this.commonAppSvc.presentToast(`User ${this.registerForm.value.email} already Exist!`, 'customToastBgError');
        return;
      }
      this.students.push({
        name:this.registerForm.value.username,
        email:this.registerForm.value.email});

      this.registerForm.reset();
      this.registerForm.value.type = 'student';
      this.commonAppSvc.presentToast('New student has been added.', 'customToastBg');
      this.isAdduser = false;
    });
  }
}
