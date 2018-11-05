import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssessmentsPage } from './assessments/assessments.page';
import { ReportsPage } from './reports/reports.page';
import { ReportPage } from './report/report.page';
import {LogOutDirective} from '../common/directives/logout';
import {KeyPadComponent} from './keypad/keypad.component'
import { FilterTitle } from './filters/filter-title';
import { FilterEmail } from './filters/filter-email';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports:[KeyPadComponent],
    declarations:[AssessmentsPage, KeyPadComponent, ReportsPage, ReportPage, LogOutDirective, FilterTitle, FilterEmail]
})
export class CommonCompenentsModule{

}