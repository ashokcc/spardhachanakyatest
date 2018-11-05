import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginPage} from './login/login.page';
import {RegisterPage} from './register/register.page';
import {StudentsRoutingModule} from './students/students-routing.module';
import {AdminRoutingModule} from './admin/admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPwdPage } from './forgotpwd/forgotpwd.page';
import { AuthGuard } from './common/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component:  RegisterPage},
  { path: 'login', component:  LoginPage},
  { path: 'forgotpwd', component:  ForgotPwdPage},
  { path: 'admin', loadChildren: './admin/admin-routing.module#AdminRoutingModule'},
  { path: 'students', loadChildren: './students/students-routing.module#StudentsRoutingModule'},
];

@NgModule({
  imports: [
    BrowserModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StudentsRoutingModule,
    AdminRoutingModule
  ],
  declarations:[RegisterPage, LoginPage, ForgotPwdPage],
  exports: [RouterModule]
})
export class AppRoutingModule { }
