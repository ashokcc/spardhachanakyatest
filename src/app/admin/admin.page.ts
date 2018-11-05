import { Component, OnInit, ViewChild, ApplicationRef, NgZone } from '@angular/core';
import { Tabs } from '@ionic/angular';

class TabModel {
  constructor(
    public title: string,
    public path: any,
    public icon: string = null,
    public badgeCount: number = 0,
    public badgeStyle: string = null
  ){
  }
}
@Component({
  selector: 'admin-page',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss']
})
export class AdminPage implements OnInit {
  @ViewChild(Tabs) tabsSelector: Tabs;    

  public tabs : TabModel[] = [];

  constructor(private appRef:ApplicationRef, private ngZone: NgZone){
    this.tabs = [
      new TabModel('Exams', '/admin/exams', 'albums'),
      new TabModel('Create Test', '/admin/createassessment', 'add'),
      new TabModel('Reports', '/admin/reports','analytics'),
      new TabModel('Students', '/admin/students', 'people')      
      ];
  }
  ngOnInit(){
    // this.tabsSelector.ionChange.subscribe((data)=>{
    //   console.log(data);
    // });
  } 
}
