import { Component, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'EtixPay-sharing-socials',
  templateUrl: './sharing-socials.component.html',
  styleUrls: ['./sharing-socials.component.scss'],
})
export class SharingSocialsComponent {
  @Input() url: string = null;
  @Input() img: string = null;

  constructor(
    private clipboard_api: ClipboardService,
    private modalController: ModalController,
    private toast_controller: ToastController,
    private translate_service: TranslateService) {
  }

  sharing (type) {
    if (this.url) this.sharing_url(type);
    else if (this.img) this.sharing_img(type)

  }

  
  sharing_url(type) {
    if (type == 'fb')  {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.url}`)
    }
    if (type == 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${this.url}`);
    }
    if (type == 'whatsapp') {
      window.open(`whatsapp://send?text=${this.url}`);
    }
    if (type == 'copy') {
      this.clipboard_api.copyFromContent(this.url);
      this.toast();
    }
    this.modalController.dismiss();
  }
  sharing_img(type) {
    if (type == 'fb')  {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.img}`)
    }
    if (type == 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${this.img}`);
    }
    if (type == 'whatsapp') {
      window.open(`whatsapp://send?text=${this.img}`);
    }
    if (type == 'copy') {
      this.clipboard_api.copyFromContent(this.img);
      this.toast();
    }
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


}
