import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink, ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormControlName, FormControl, FormGroup, FormGroupName} from '@angular/forms';
import { AssessmentsSvc } from './assessments.service';
import {CommonAppSvc} from '../../common/common.service';
import { AuthSvc } from '../auth';

@Component({
  selector: 'assessments-page',
  templateUrl: 'assessments.page.html',
  styleUrls: ['assessments.page.scss'],
})
export class AssessmentsPage implements OnInit{
  public allAssessments = [];
  public currAssessmentQtns = [];
  public currQtnNo: number = 0;
  public duration: number;
  public minutes: number;
  public seconds: number;
  public currQtn: any;
  public allQuestions: any[] = [];
  public title:any = 'All Assessments';
  public isTestCompleted: boolean = false;
  public isQtnSelected:boolean = false;
  public noTests: boolean = true;
  public id: any;
  public assessmentForm: FormGroup;
  public testId: any;
  public isExamStarted: boolean = false;
  public searchTitle: any;
  public showKeyBoard: boolean = false;
  public currFocusEl: any;
  @HostListener('click', ['$event']) onclick($event){
    this.onPageClickHandler($event)
  }  
  constructor(public assessmentsSvc:AssessmentsSvc,
            public fb:FormBuilder,
            public router:Router,
            public commonAppSvc: CommonAppSvc,
            public authSvc:AuthSvc){}

  ngOnInit(){
    this.getAssessments();
  }
  
  getAssessments(){
    this.commonAppSvc.presentLoading('').then((_loading)=>{
      this.showLoading(_loading);
      this.assessmentsSvc.getAssessments().subscribe((questions:any)=>{
        this.allAssessments = questions.data.assessments;
        this.hideLoading(_loading);
        this.noTests = this.allAssessments.length ? false: true;
      });
    });
  }
  formatData(q){
    this.title = q.topic;
    this.duration = q.duration;
    this.id = q.id;
    this.currAssessmentQtns = q.questions;
    this.currQtn = this.currAssessmentQtns[this.currQtnNo];
    this.isQtnSelected = true;
    this.isTestCompleted = false;
    this.isExamStarted = true;
  }
  startExam(q){
    this.formatData(q);
    this.populateExamDetails();
    this.minutes = this.duration-1;
    this.seconds = 60;
    this.startTimer();
  }
  populateExamDetails(){
    this.assessmentForm = this.fb.group({
      question:[''],
      options:this.fb.array([]),
      selectedOption:['']
    });
  }
  createOptions(): FormGroup{
    return this.fb.group({
      option:['']
    });
  }
  nextQtn(){    
    if(this.assessmentForm.value.selectedOption === ''){
      this.commonAppSvc.presentToast('Please select an option.', 'customToastBgError');
      return;
    }
    let obj = {
      question: this.currAssessmentQtns[this.currQtnNo].question,
      selectedOption: this.assessmentForm.value.selectedOption
    };
    this.allQuestions.push(obj);
    this.currQtnNo++;
    if(this.currAssessmentQtns.length === this.currQtnNo){
      this.submitAnswers();
    }else{
      this.currQtn = this.currAssessmentQtns[this.currQtnNo];
    }
  }

  timer(){
    if (this.seconds === 0) {
      this.minutes--;
      this.seconds = 60;      
    }
    if(!this.isTestCompleted){
      this.startTimer();
    }
    this.seconds--;
  }

  startTimer(){
    setTimeout(()=>{
      if(this.minutes === 0 && this.seconds === 0){
        this.seconds = 0;
        this.submitAnswers();
      }else{
        this.timer();
      }
    }, 1000);
  }

  navigateToReport(){
    if(this.authSvc.userType === 'student'){
      this.router.navigate(['students/reports/report', this.testId]);
    }else{
      this.router.navigate(['admin/reports/report', this.testId]);
    }
  }

  submitAnswers(){
    this.commonAppSvc.presentLoading('Submitting Test').then((_loading)=>{
      this.showLoading(_loading);
      this.assessmentsSvc.submitAnswers(this.title, this.id, this.allQuestions).subscribe((data:any)=>{
        this.testId = data.data.testId;
        this.hideLoading(_loading);
        this.isTestCompleted = true;
        this.commonAppSvc.presentToast('Test completed.', 'customToastBg');
      });
    });
  }
  showLoading(_loading){
    _loading.present();
  }
  hideLoading(_loading){
    _loading.dismiss();
  }
  onInput(e){
    this.showKeyBoard = true;
    this.currFocusEl = e.target.value;    
  }
  onCancel(e){
    console.log('onCancel', e.target);
  }
  changeInput(e){
    this.searchTitle = e;
    this.showKeyBoard = false;
  }
  onPageClickHandler($event){
    let tagName = $event.target.tagName;
    let attr = $event.target.attributes;
    if(tagName === "ION-CONTENT"){
      this.showKeyBoard = false;      
    }else{
      let keyBDBtnClassName = (attr && attr.class) ?  attr.class.value : '';
      let cls = $event.target.classList;
      if(tagName === 'INPUT' || tagName === 'ION-INPUT' || cls.contains('backspace') || cls.contains('key') || keyBDBtnClassName ==='keys-container'){
        this.showKeyBoard = true;
      }else{
        this.showKeyBoard = false;
      }
    }
  }  
}
