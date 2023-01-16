import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CarterasService } from '../../../carteras.service';
import { TranslateService } from '@ngx-translate/core';
import { ClipboardService } from 'ngx-clipboard';
import { SharingSocialsComponent } from '../../../../../../shared/sharing-socials/sharing-socials.component';

@Component({
  selector: 'app-mi-wallet',
  templateUrl: './mi-wallet.component.html',
  styleUrls: ['./mi-wallet.component.scss'],
})
export class MiWalletComponent implements OnInit {
  seg_seleccionado  = 1;
  qr_codes = {
    uno: null,
    dos: null,
    wallet: null,
    code_promo: null
  }
  constructor(
    private social_sharing: SocialSharing,
    private popover_controller: PopoverController,
    private modal_controller: ModalController,
    private cartera_service: CarterasService,
    private translate_service: TranslateService,
    private clipboard_api: ClipboardService,
    private toast_controller: ToastController
    ) { }

  ngOnInit() {
    this.cargar_data();
  }
  salirSinArgumentos() {
    this.modal_controller.dismiss();
  }
  copiar() {
    if (this.seg_seleccionado == 1) this.clipboard_api.copyFromContent('https://youetix.com/#/'+ localStorage.getItem('lenguaje') +'/auth/register/'+this.qr_codes.code_promo);
    if (this.seg_seleccionado == 2) this.clipboard_api.copyFromContent(this.qr_codes.wallet);
    this.toast(); 
  }
  async toast() {
    let texto; this.translate_service.get('COPIADO').subscribe(value => { texto = value; });
    const toast = await this.toast_controller.create({
      message: texto,
      mode: 'md',
      duration: 1500
    });
    toast.present();
  }
  cargar_data() {
    this.cartera_service.qrs().subscribe((data: any) => {
      this.qr_codes.uno = data.data.usuarioQRLINKREFERIDO;
      this.qr_codes.dos = data.data.wallets[0].walletQR;
      this.qr_codes.code_promo = data.data.usuarioCODIGO;
      this.qr_codes.wallet = data.data.wallets[0].walletCODIGO;
    },  errorServicio => {
      if (errorServicio.message) {
        this.Alert(errorServicio.error.message, 'OK' , true);
      }
    });
  }
  share() {
    if (this.seg_seleccionado == 1) this.sharingImg(this.qr_codes.uno);
    if (this.seg_seleccionado == 2) this.sharingImg(this.qr_codes.dos);
  }
  share_text() {
    if (this.seg_seleccionado == 1) this.sharing('https://youetix.com/#/'+ localStorage.getItem('lenguaje') +'/auth/register/'+this.qr_codes.code_promo);
    if (this.seg_seleccionado == 2) this.sharing(this.qr_codes.wallet);
  }
  /* share() {
    if (this.seg_seleccionado == 1) this.social_sharing.share('',null,this.qr_codes.uno,null);
    if (this.seg_seleccionado == 2) this.social_sharing.share('',null,this.qr_codes.dos,null);
  }
  share_text() {
    if (this.seg_seleccionado == 1) this.social_sharing.share('https://youetix.com/#/'+ localStorage.getItem('lenguaje') +'/auth/register/'+this.qr_codes.code_promo,null,null,null);
    if (this.seg_seleccionado == 2) this.social_sharing.share(this.qr_codes.wallet,null,null,null);
  } */
  async sharing(url) {
    const modal = await this.modal_controller.create({
      component: SharingSocialsComponent,
      cssClass: 'sharingClass',
      componentProps: { url },
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async sharingImg(img) {
    const modal = await this.modal_controller.create({
      component: SharingSocialsComponent,
      cssClass: 'sharingClass',
      componentProps: { img },
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

  async Alert(tex, bot, tipo) {
    const popover = await this.popover_controller.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: tipo
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }
}
