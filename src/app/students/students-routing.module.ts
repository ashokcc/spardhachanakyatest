import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StudentsPage } from './students.page';
import { AssessmentsPage } from '../common/assessments/assessments.page';
import { ReportsPage } from '../common/reports/reports.page';
import { CommonCompenentsModule } from '../common/common.module';
import { SettingsPage } from './settings/settings.page';
import { ReportPage } from '../common/report/report.page';

const routes : Routes = [
  { path: 'students', redirectTo: 'students/exams', pathMatch: 'full' },
  { path: 'students', component: StudentsPage,
      children:[
        { path:'exams',component:  AssessmentsPage},        
        { path:'reports',
          children:[
            { path:'',component:  ReportsPage},
            { path:'report/:testId',component:  ReportPage}
          ]
        },
        { path:'settings',component:  SettingsPage}
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
  declarations: [StudentsPage, SettingsPage],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
