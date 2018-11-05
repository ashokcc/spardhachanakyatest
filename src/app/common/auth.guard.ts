import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { AuthSvc } from "./auth";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private router: Router, private authSvc: AuthSvc){

    }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot):any{

        if(!this.authSvc.token){
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean{
            if(!this.authSvc.token){
                this.router.navigateByUrl('/login');
                return false;
            }
            return true;
    }
}