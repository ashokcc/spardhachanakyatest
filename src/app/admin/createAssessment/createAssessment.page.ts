import { Component, OnInit, HostListener, ElementRef, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import {FormBuilder, Validators, FormGroup, FormArray, FormControl, FormControlName} from '@angular/forms';
import {CreateAssessmentSvc} from './create.assessment.service';
import {CommonAppSvc} from '../../common/common.service';
@Component({
  selector: 'create-assessment',
  templateUrl: 'createAssessment.page.html',
  styleUrls: ['createAssessment.page.scss'],
})
export class CreateAssessmentPage implements OnInit{
  public questionsForm: FormGroup;
  public questionsCount: number = 0;
  public showKeyBoard: boolean = false;
  public currFocusEl: any;
  public isCurrInputChanged: boolean = false;
  public currControl: any = '';
  @HostListener('click', ['$event']) onclick($event){
    this.onPageClickHandler($event)
  }
  constructor(public fb: FormBuilder, 
              public assessment: CreateAssessmentSvc,
              public router:Router,
              public commonAppSvc: CommonAppSvc,
              public el:ElementRef,
              public nKB:NativeKeyboard,
              public kb:Keyboard){}

  ngOnInit(){
    this.createQtnForm();
  }

  onFocus(e){
    //e.preventDefault();
    //this.kb.hide();
    this.showKeyBoard = true;
    this.currFocusEl = e;
  }

  onFocusOut(e){
    this.showKeyBoard = false;
  }

  changeInput(e){
    this.currFocusEl.setValue(e);
  }

  onPageClickHandler($event){
    let tagName = $event.target.tagName;
    let attr = $event.target.attributes;
    if(tagName === "ION-CONTENT"){
      this.showKeyBoard = false;      
    }else{
      let keyBDBtnClassName = (attr && attr.class) ?  attr.class.value : '';
      let cls = $event.target.classList;
      if(tagName === 'ION-INPUT' || cls.contains('backspace') || cls.contains('key') || keyBDBtnClassName ==='keys-container'){
        this.showKeyBoard = true;
      }else{
        this.showKeyBoard = false;
      }
    }
  }
  createQtnForm(){
    this.questionsForm = this.fb.group({
      topic:['', Validators.required],
      duration:['', Validators.required],
      questions: this.fb.array([])
    });
  }
  createQuestion(): FormGroup{
    let arr = [];
    for(let i=0;i<4;i++){
      arr.push(this.createOption());
    }
    return this.fb.group({
      question:'',
      options:this.fb.array(arr),
      answer:''
    });

  }
  addQuestion(){
    const questionsList = this.questionsForm.get('questions') as FormArray;
    questionsList.push(this.createQuestion());
    this.questionsCount++;
  }
  createOption(): FormGroup{
    return this.fb.group({
      option:['']
    });
  }
  removeQuestion(question, index){
    const questions = this.questionsForm.get('questions') as FormArray;
    questions.removeAt(index);
    this.questionsCount--;
  }
  saveAssessment(){
    if(this.questionsForm.status === "INVALID"){
      return;
    }
    this.assessment.createAssessment(this.questionsForm.value).subscribe((data)=>{
      this.commonAppSvc.presentToast('Assessment has been saved.', 'customToastBg');
      this.router.navigateByUrl('admin/exams');
    });

  }
}
