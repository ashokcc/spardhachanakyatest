import {Injectable} from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthSvc{
    public isUserAuthenticated: boolean = false;
    public token: any = null;
    public email: any = null;
    public userName: any = null;
    public userType: string = null;
    constructor(){}

    setUserDetails(data){
        this.isUserAuthenticated = true;
        this.token = data.token;
        this.setStorageData();
        this.email = data.email;
        this.userName = data.username;
        this.userType = data.type;
    }
    setStorageData(){
        localStorage.setItem('token', this.token);
    }
    getStorageData(){
        return localStorage.getItem('token');
    }
    clearStorageData(){
        return localStorage.removeItem('token');
    }    
}