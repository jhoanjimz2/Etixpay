import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RecargasComponent } from '../paginas-usuarios/cartera/components/botones/recargas/recargas.component';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  modalWelcome = true;
  imgTurotial = '';
  dirLanguage = '';
  nroImage = 1
  dirImg = 'assets/pages/tutorial/';
  imagesTutorial = [];
  showAnimationClick = false;
  timeAnimation: any;
  timeImage: any;
  opcion_modal = 3;
  cantidad = 50;

  constructor(
    private router: Router,
    private modal_controller: ModalController
  ) { }

  ngOnInit() {
    const language = localStorage.getItem('lenguaje');
    if (language === 'es') this.dirLanguage = 'es/';
    if (language === 'it') this.dirLanguage = 'it/';
    if (language === 'en') this.dirLanguage = 'en/';
    if (language === 'ro') this.dirLanguage = 'ron/';
    if (language) {
      this.dirLanguage = 'it/'
      this.imagesTutorial = [
        this.dirImg + this.dirLanguage + 'tutorial-2.png',
        this.dirImg + this.dirLanguage + 'tutorial-3.png',
        this.dirImg + this.dirLanguage + 'tutorial-4.png',
        this.dirImg + this.dirLanguage + 'tutorial-5.png',
        this.dirImg + this.dirLanguage + 'tutorial-6.png',
        this.dirImg + this.dirLanguage + 'tutorial-7.png',
        this.dirImg + this.dirLanguage + 'tutorial-8.png',
        this.dirImg + this.dirLanguage + 'tutorial-9.png',
        this.dirImg + this.dirLanguage + 'tutorial-10.png',
        this.dirImg + this.dirLanguage + 'tutorial-11.png',
        this.dirImg + this.dirLanguage + 'tutorial-12.png',
        this.dirImg + this.dirLanguage + 'tutorial-13.png',
        this.dirImg + this.dirLanguage + 'tutorial-14.png',
        this.dirImg + this.dirLanguage + 'tutorial-15.png',
        this.dirImg + this.dirLanguage + 'tutorial-16.png',
        this.dirImg + this.dirLanguage + 'tutorial-17.png',
        this.dirImg + this.dirLanguage + 'tutorial-18.png',
        this.dirImg + this.dirLanguage + 'tutorial-19.png',
      ];
    }
  }

  getModalWelcome(res: boolean) {
    this.modalWelcome = res;
    setTimeout(() => {
      this.nroImage = 2;
    }, 4000);
    this.timeAnimation = setInterval(() => {
      this.animationClick();
    }, 2000);
  }

  animationClick() {
    this.showAnimationClick = !this.showAnimationClick;
  }

  continue(nroImg: number, animation: boolean, time: boolean) {
    this.nroImage = nroImg;
    clearInterval(this.timeAnimation);
    clearInterval(this.timeImage);
    this.showAnimationClick = false;
    if (nroImg === 19) {
      localStorage.setItem('tutorial', 'true');
      this.router.navigate(["/tabs/cartera"]);
      this.recarga_tc();
    } 
    if (animation) {
      this.timeAnimation = setInterval(() => {
        this.animationClick();
      }, 2000);
    }
    if(time) {
      this.timeImage = setInterval(() => {
        this.imageTime();
      }, 4000);
    }
  }

  imageTime() {
    this.nroImage++;
    if (this.nroImage === 7 || this.nroImage === 12 || this.nroImage === 15 || this.nroImage === 17) {
      clearInterval(this.timeImage);
      this.timeAnimation = setInterval(() => {
        this.animationClick();
      }, 2000);
    } 
  }

  async recarga_tc() {
    const modal = await this.modal_controller.create({
      component: RecargasComponent,
      cssClass: 'modal_recargas',
      backdropDismiss: true,
    });
    modal.componentProps = {  modal, cantidad: this.cantidad, opcion_modal: this.opcion_modal }
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
