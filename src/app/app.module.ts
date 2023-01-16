import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { IConfig } from 'ngx-mask';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PipesModule } from './pipes/pipes.module';
import { IonicRatingModule } from 'ionic4-rating';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NgxCalendarModule } from 'ngx-calendar-ionic';
import { ClipboardModule } from 'ngx-clipboard';
import localeIt from '@angular/common/locales/it';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


registerLocaleData(localeIt, 'it');

const options: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ClipboardModule,
    NgxCalendarModule,
    BrowserModule, 
    IonicRatingModule,
    IonicModule.forRoot(), 
    NgxMaskModule.forRoot(options),
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    TranslateModule.forRoot({loader: {provide: TranslateLoader,useFactory: (createTranslateLoader),deps: [HttpClient]}}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },

    SocialSharing,

    SplashScreen,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
