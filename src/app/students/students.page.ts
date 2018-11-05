import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'students-page',
  templateUrl: 'students.page.html',
  styleUrls: ['students.page.scss'],
})
export class StudentsPage implements OnInit {
  @ViewChild(Tabs)
  public tabsSelector: Tabs;    
  public tabs : TabModel[] = [];

  constructor(){
    this.tabs = [
      new TabModel('Exams', '/students/exams', 'albums'),
      new TabModel('Reports', '/students/reports', 'analytics'),
      new TabModel('Settings', '/students/settings', 'settings')
      ];
  }
  ngOnInit(){
    //this.tabsSelector.select(0);
  }
}
