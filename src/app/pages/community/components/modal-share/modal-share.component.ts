import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.scss'],
})
export class ModalShareComponent implements OnInit {

  @Output ('setShare') setShare: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input ('codeUser') codeUser = '';

  constructor(
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private platform: Platform
  ) { }

  ngOnInit() {}

  share(language: string) {
    let dataShare = {
      title: '',
      text: '',
      url: ''
    }
    if (language === 'IT') {
      dataShare = {
        title: 'App EtixPay, Ciao, ti invito a registrarti in questa app',
        text: 'Ciao, ti invito a registrarti in questa app',
        url: 'https://register.youetix.com/#/it/auth/register/' + this.codeUser
      }
    }

    if (language === 'ES') {
      dataShare = {
        title: 'App EtixPay, Hola te invito a registrarte en esta App',
        text: 'Hola te invito a registrarte en esta App',
        url: 'https://register.youetix.com/#/es/auth/register/' + this.codeUser
      }
    }

    if (language === 'EN') {
      dataShare = {
        title: 'App EtixPay, Hi, I invite you to register in this App',
        text: 'Hi, I invite you to register in this App',
        url: 'https://register.youetix.com/#/en/auth/register/' + this.codeUser
      }
    }
    if (this.platform.is('cordova')) {
      console.log(dataShare)
      this.socialSharing.share(
        dataShare.title,
        dataShare.text,
        'https://s3youetix.fra1.digitaloceanspaces.com/etixpay/Logos/etix_img_invita.png', // file o archivo
        dataShare.url
      );
      this.hideModal();
    } else {
      if (navigator['share']) {
        navigator['share'](dataShare)
          .then(() => {
            console.log('Successful share');
            this.hideModal();
          })
          .catch((error) => console.log('Error sharing', error));
      }
    }   
  }

  hideModal() {
    this.setShare.emit(false);
  }

}
