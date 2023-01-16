import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { IonSlides, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertComponent } from '../../../../../shared/alert/alert.component';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements OnInit {
  @ViewChild('slide', { static: true }) slide: IonSlides;
  @Output() actualizar: EventEmitter<any> = new EventEmitter();
  @Input() proyectos_grafica: any = [];
  slides = {
    initialSlide: 0,
    observer: true,
    observeParents: true,
    speed: 500,
    slidesPerView: 5
  };
  slides_dos = {
    initialSlide: 0,
    observer: true,
    observeParents: true,
    speed: 500,
    slidesPerView: 1
  };

  constructor(
    private toast_controller: ToastController,
    private translate_service: TranslateService,
    private popover_controller: PopoverController,
  ) {
  }

  ngOnInit() {
  }
  actualizar_datos() {
    this.actualizar.emit();
    this.toast(1)
  }
  async toast(tipo) {
    let texto;
    if (tipo == 1) { this.translate_service.get('ACTUALIZANDO').subscribe(value => { texto = value; });}
    if (tipo == 2) { this.translate_service.get('COPIADO').subscribe(value => { texto = value; });}
    const toast = await this.toast_controller.create({
      message: texto,
      mode: 'md',
      duration: 1500
    });
    toast.present();
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
