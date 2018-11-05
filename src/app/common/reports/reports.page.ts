import { Component, OnInit} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ReportsSvc } from './reports.service'
import { ReportSvc } from '../report/report.service'
import {AuthSvc} from './../auth';
import { CommonAppSvc } from '../common.service';
@Component({
  selector: 'reports-page',
  templateUrl: 'reports.page.html',
  styleUrls: ['reports.page.scss'],
})
export class ReportsPage implements OnInit{
  public allTests: any;
  public noTestsMsg: boolean = false;
  public searchByEmail: any;
  constructor(public route: ActivatedRoute, 
    public reportsSvc:ReportsSvc, 
    public reportSvc: ReportSvc,
    public authSvc:AuthSvc,
    public router:Router,
    public commonAppSvc: CommonAppSvc){
  }
  
  ngOnInit(){
    this.commonAppSvc.presentLoading('loading..').then((_loading)=>{
      _loading.present();
      this.reportsSvc.getReports().subscribe((data:any)=>{
        this.allTests = data.data;
        _loading.dismiss();
        this.noTestsMsg = this.allTests.length ? false : true;
        this.reportsSvc.allReports = data.data;
      });
    });
  }

  viewReport(test){
    if(this.authSvc.userType === 'student'){
      this.router.navigate(['students/reports/report', test._id]);
    }else{
      this.router.navigate(['admin/reports/report', test._id]);
    }
  }
}
