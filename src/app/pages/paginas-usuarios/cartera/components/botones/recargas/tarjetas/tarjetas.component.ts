import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MetodosPagoService } from 'src/app/services/metodos-pago.service';
import { TranslateService } from '@ngx-translate/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { AddMetodoPagoComponent } from 'src/app/pages/ajustes/components/add-metodo-pago/add-metodo-pago.component';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent {
  @Output() seleccionar: EventEmitter<any> = new EventEmitter();
  @Input() cuenta_seleccionada: any = {};
  @ViewChild('slide_tarjetas', { static: false }) slide_tarjetas: IonSlides;
  option_tarjetas = {
    spaceBetween: 10,
    centeredSlides: true,
    speed: 1500
  };
  tarjetas = [];
  texto;

  constructor(
    private metodos_pago_service: MetodosPagoService,
    private modal_controller: ModalController,
    private translate_service: TranslateService
    ) { 
    this.translate_service.get('PREPAID').subscribe(value => { this.texto = value; });
    this.cargar_tarjetas();
  }
  cargar_tarjetas() {
    this.metodos_pago_service.cargar_cuentas().subscribe((data: any) => {
      if(data.data) this.tarjetas = data.data;
      this.renombrar_tc();
    }, error => {
    })
  }
  renombrar_tc() {
    this.tarjetas.forEach( data => {
      data['texto'] = this.texto + ' •••• ' + data.last4;
      data['nombre'] = data.brand;
      data['correo'] = data.name;
      data['img'] = this.img(data.brand);
      data['seleccionado'] = false;
    })
  }
  img (tipo) {
    if (tipo == 'Diners Club') return "/assets/tabs/componentes/diners.png"; 
    if (tipo == 'American Express') return "/assets/tabs/componentes/american.png"; 
    if (tipo == 'MasterCard') return "/assets/tabs/componentes/mastercard.png"; 
    if (tipo == 'Visa') return "/assets/tabs/componentes/visa.png"; 
  }
  select_cuenta (cuenta) {
    let prev = this.cuenta_seleccionada;
    prev.seleccionado = false; 
    this.cuenta_seleccionada = cuenta; 
    this.cuenta_seleccionada.seleccionado = true;
    this.seleccionar.emit( {cuenta_seleccionada: this.cuenta_seleccionada})
  }
  async add_metodo_pago() {
    const modal = await this.modal_controller.create({
      component: AddMetodoPagoComponent,
      componentProps: {  tipo: 'card'   },
      cssClass: 'modal_add_metodo_pago',
      backdropDismiss: false,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) this.cargar_tarjetas();
  }

}
