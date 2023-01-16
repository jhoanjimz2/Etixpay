import { Component } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  app: boolean = false;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private translate: TranslateService,
    private router: Router,
    private modal_controller: ModalController,
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private settingsService: SettingsService
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.settingsService.cargarAjustes();
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.back_dos();
      if (!this.isMobile) this.app = true;
      

      setTimeout(() => this.splashScreen.hide() ,3000);

      this.translate.addLangs(['es', 'en', 'ro' , 'it']);
      
      if (localStorage.getItem('lenguaje')) {
        if (JSON.parse(localStorage.getItem('user'))) this.router.navigate(["/tabs/home"]);
        if (!JSON.parse(localStorage.getItem('user'))) this.router.navigate(["/auth/login"]);
      } else {
        this.router.navigate(["/auth/idioma-inicial"]);
      }

      if (localStorage.getItem('lenguaje')) {
        this.translate.setDefaultLang(localStorage.getItem('lenguaje'));
        this.translate.use(localStorage.getItem('lenguaje'));
      } else {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        localStorage.setItem('lenguaje', 'en');
      } 
    });
  }

  back_dos() {
    
    this.platform.backButton.subscribeWithPriority(10, async() => {
      if (this.modal_controller.getTop()) {
        const modal = await this.modal_controller.getTop();
        if (modal) this.modal_controller.dismiss();
        else this.navCtrl.back();
      } 
    });
  }


  get isMobile(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true
    else return false
  } 

}
