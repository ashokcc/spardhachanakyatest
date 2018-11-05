import { Component, OnInit} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ReportSvc } from './report.service';
import {AuthSvc} from './../auth';
import {CommonAppSvc} from '../../common/common.service';

@Component({
  selector: 'report-page',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss'],
})
export class ReportPage implements OnInit{
  public testResults: any;
  constructor(public route: ActivatedRoute,
              public reportSvc:ReportSvc,
              public authSvc:AuthSvc,
              public router:Router,
              public commonAppSvc: CommonAppSvc
            ){}

  ngOnInit(){
    this.commonAppSvc.presentLoading('loading..').then((_loading)=>{
      _loading.present();
      this.reportSvc.getReport(this.route.snapshot.paramMap.get('testId')).subscribe((data:any)=>{
        _loading.dismiss();
        this.testResults = data.data.testResults;
      });
    });
  }
  viewReports(){
    if(this.authSvc.userType === 'student'){
      this.router.navigate(['students/reports']);
    }else{
      this.router.navigate(['admin/reports']);
    }    
  }

}
