import { NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonInterceptor } from './common/intercept.service';
import { AppConstants } from './common/constants';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports:[],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule	
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeKeyboard,
    Keyboard,    
    AppConstants,
    { provide: LOCALE_ID, useValue: 'kn' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
