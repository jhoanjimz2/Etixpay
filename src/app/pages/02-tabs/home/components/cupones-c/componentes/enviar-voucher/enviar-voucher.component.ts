import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ModalController, PopoverController } from '@ionic/angular';
import { CargandoService } from '../../../../../../../services/cargando.service';
import { HomeService } from '../../../../../../../services/home.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-enviar-voucher',
  templateUrl: './enviar-voucher.component.html',
  styleUrls: ['./enviar-voucher.component.scss'],
})
export class EnviarVoucherComponent implements OnInit {
  @Input() voucher: any;
  titulo_uno;
  titulo_dos;
  formulario;

  constructor(
    private form_builder: FormBuilder,
    private modal_controller: ModalController,
    private cargando_service: CargandoService,
    private home_service: HomeService,
    private popover_controller: PopoverController
    ) { }

  ngOnInit() {
    this.cargar_formulario();
    if( this.voucher.evento ) this.datos_evento();
    if( this.voucher.tienda ) this.datos_tienda();
    if( this.voucher.expert ) this.datos_experto();
  }
  cargar_formulario() {
    this.formulario = this.form_builder.group({
      recipiente: new FormControl('', [
        Validators.required
      ]),
      mensage: new FormControl('', [
        Validators.required
      ]),
      check: new FormControl(false, [
        Validators.required,
        Validators.requiredTrue
      ])
    });
  }
  get categoria() {
    if (localStorage.getItem('lenguaje') == 'it') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULORO;
  }
  datos_evento() {
    this.titulo_uno = "Event";
    this.titulo_dos = this.voucher.evento.eventoTITULO;
  }
  datos_tienda() {
    this.titulo_uno = "Store";
    this.titulo_dos = this.voucher.tienda.empresaNOMBREMAP;
  }
  datos_experto() {
    this.titulo_uno = "Expert";
  }
  regalar_voucher() {
    this.cargando_service.iniciaCargando();
    this.home_service.regalar_voucher(this.voucher.id, this.formulario.controls.recipiente.value).subscribe( (data: any) => {
      this.cargando_service.terminaCargando();
      if (!data.data) return this.Alert(data.message, 'OK', true);
      this.modal_controller.dismiss({data: true});
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async Alert(tex, bot, value) {
    const popover = await this.popover_controller.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: value
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
