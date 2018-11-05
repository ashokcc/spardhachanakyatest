import {Directive, HostBinding, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {LoginSvc} from '../../login/login.service';
import { AuthSvc } from '../../common/auth';

@Directive({
    selector: "[logout]"
})
export class LogOutDirective{
    @HostListener('click', ['$event']) onClick(){
        this.logOut();
    }
    constructor(public loginSvc:LoginSvc, 
        public authSvc:AuthSvc,
        public router:Router){}

    logOut(){
        this.loginSvc.logout().subscribe((data)=>{
            this.authSvc.token = null;
            this.authSvc.clearStorageData();
            this.router.navigateByUrl('/login');
            //window.history.forward();
            this.callPopState();
        });     
    }
    callPopState(){
        window.addEventListener('popstate', function () {
            window.history.pushState(null, null, 'login');
        });        
    }
}