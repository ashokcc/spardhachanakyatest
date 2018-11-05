import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AdminPage } from './admin.page';
import { CreateAssessmentPage } from './createAssessment/createAssessment.page';
import { StudentsPage } from './students/students.page';
import { AssessmentsPage } from '../common/assessments/assessments.page';
import { ReportsPage } from '../common/reports/reports.page';
import { CommonCompenentsModule } from '../common/common.module';
import { ReportPage } from '../common/report/report.page';
const routes : Routes = [
  { path: 'admin', redirectTo: 'admin/exams', pathMatch: 'full' },
  { path: 'admin', component: AdminPage, 
    children:[
      { path:'exams', component:  AssessmentsPage},
      { path:'createassessment',component:  CreateAssessmentPage},
      { path:'students',component:  StudentsPage},
      { path:'reports',
        children:[
          { path:'',component:  ReportsPage},
          { path:'report/:testId',component:  ReportPage}
        ]
      },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonCompenentsModule
  ],
  declarations: [AdminPage,CreateAssessmentPage, StudentsPage],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
