import { Component, QueryList, ViewChildren } from '@angular/core';

import { Platform, IonRouterOutlet} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonAppSvc } from './common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  public counter: number= 0;
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public commonAppSvc: CommonAppSvc
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.splashScreen.show();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe(() => {
        if (this.counter == 0) {
          this.counter++;
          this.commonAppSvc.presentToast('Press again to exit.', 'customToastBg');
          setTimeout(() => { this.counter = 0 }, 3000);
        } else {
          navigator['app'].exitApp();
        }
      }, 0);    
    });
  }
}
