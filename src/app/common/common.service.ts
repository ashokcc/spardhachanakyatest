import {Injectable} from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({providedIn:'root'})
export class CommonAppSvc{
    constructor(public toastCtlr: ToastController,
                public loadingCtlr: LoadingController){}

    async presentToast(msg:string, cssClass: string) {
      const toast = await this.toastCtlr.create({
        message: msg,
        duration: 2000,
        cssClass:cssClass
      });
      toast.present();
    }
    async presentLoading(msg:string) {
      const loading = await this.loadingCtlr.create({
        message: msg
      });
      return await loading;
    }      
}