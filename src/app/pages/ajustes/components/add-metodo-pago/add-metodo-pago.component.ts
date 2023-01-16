import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CuentaService } from '../../../../services/cuenta.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { CargandoService } from '../../../../services/cargando.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-metodo-pago',
  templateUrl: './add-metodo-pago.component.html',
  styleUrls: ['./add-metodo-pago.component.scss'],
})
export class AddMetodoPagoComponent {
  @Input() tipo;
  form_bank;
  form_card;
  paises = []; 
  pais: any = []; 
  page = 1; size = 15;
  tipo_user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private form_builder: FormBuilder,
    private cuenta_service: CuentaService,
    private popover_controller: PopoverController,
    private modalController: ModalController,
    private cargando_service: CargandoService,
  ) { 
    this.cargar_formulario_bank();
    this.cargar_formulario_card();
    this.cargar_paises();
  }
  async closeModalPay() {
    this.modalController.dismiss();
  }
  salir_con_argumentos() {
    this.modalController.dismiss({data: true})
  }
  cargar_formulario_bank() {
    this.form_bank = this.form_builder.group({
      cuenta: new FormControl('', [
        Validators.required
      ]),
      titular: new FormControl('', [
        Validators.required,
      ]),
      pais: new FormControl('', [
        Validators.required,
      ]),
      swift: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  cargar_formulario_card() {
    this.form_card = this.form_builder.group({
      numero: new FormControl('', [
        Validators.required
      ]),
      titular: new FormControl('', [
        Validators.required,
      ]),
      fecha_exp: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(3)
      ]),
      cvc: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
      ]),
    });
  }
  numero_tarjeta() {
    let valor_input = this.form_card.controls.numero.value;
    this.form_card.controls.numero.value = valor_input
      //Elimina espacios
      .replace(/\s/g, '')
      //Elimina las letras
      .replace(/\D/g, '')
      //espacio cada 4 numeros
      .replace(/([0-9]{4})/g, '$1 ')
      //Elimina ultimo espaciado
      .trim();
  }
  numero_cvc() {
    let valor_input = this.form_card.controls.cvc.value;
    this.form_card.controls.cvc.value = valor_input
      //Elimina espacios
      .replace(/\s/g, '')
      //Elimina las letras
      .replace(/\D/g, '')
      //Elimina ultimo espaciado
      .trim();
  }
  fecha_caducidad() {
    let valor_input = this.form_card.controls.fecha_exp.value;
    this.form_card.controls.fecha_exp.value = valor_input
    //Elimina espacios
    .replace(/\s/g, '')
    //Elimina las letras
    .replace(/\D/g, '')
    .replace(/( 00|01|02|03|04|05|06|07|08|09|10|11|12|00 {2}?)/g, '$1/')
    //Elimina ultimo espaciado
    .trim();
  }
  add_cuenta(tipo) {
    if(tipo == 'bank') this.add_cb();
    if(tipo == 'card') this.add_tc();
  }
  add_cb() {
    if ( this.tipo_user.tipoUsuario == 3)  this.add_cuenta_bancaria_persona();
    if ( this.tipo_user.tipoUsuario != 3)  this.add_cuenta_bancaria_empresa();
  }
  add_tc() {
    let card = {
     number:  this.form_card.controls.numero.value,
     exp_month: this.form_card.controls.fecha_exp.value.substr(0,2),
     exp_year:  this.form_card.controls.fecha_exp.value.substr(3,4),
     cvc:  this.form_card.controls.cvc.value,
     name: this.form_card.controls.titular.value
    };
    this.add_tarjeta_credito(card);
  }
  add_tarjeta_credito(card) {
    this.cargando_service.iniciaCargando();
    this.cuenta_service.add_tarjeta_credito(card, JSON.parse(localStorage.getItem('user')).username).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      this.salir_con_argumentos();
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  add_cuenta_bancaria_persona() {
    this.cargando_service.iniciaCargando();
    this.cuenta_service.add_cuenta_bancaria_persona(
      this.form_bank.controls.titular.value, 
      this.form_bank.controls.pais.value.id, 
      this.form_bank.controls.cuenta.value, 
      this.form_bank.controls.swift.value).subscribe( (data:any) => {
        this.cargando_service.terminaCargando();
        this.salir_con_argumentos();
        this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  add_cuenta_bancaria_empresa() {
    this.cargando_service.iniciaCargando();
    this.cuenta_service.add_cuenta_bancaria_empresa(
      this.form_bank.controls.titular.value, 
      this.form_bank.controls.pais.value.id, 
      this.form_bank.controls.cuenta.value, 
      this.form_bank.controls.swift.value).subscribe( (data:any) => {
        this.cargando_service.terminaCargando();
        this.salir_con_argumentos();
        this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
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
  //PAISES
  cargar_paises() {
    this.cuenta_service.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.getPaises(this.page, this.size);
    });
  }
  getPaises(page?: number, size?: number) {
    if (page && size) {
      this.pais = this.pais.concat(this.paises.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page++;
    return this.pais;
  }
  close() {
    this.page = 1;
    this.size = 15;
    this.getPaises(this.page, this.size);
  }
  obtenerPaises(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    if (this.page > this.paises.length / this.size) {
      event.component.disableInfiniteScroll();
      return;
    }
    setTimeout(() => {
      let paisesArray = this.getPaises(this.page, this.size);
      paisesArray = event.component.items.concat(paisesArray);
      event.component.items = paisesArray;
      event.component.endInfiniteScroll();
    }, 500);
  }

  buscarPais(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text) {
      event.component.items = this.getPaises(this.page, this.size);
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }

    setTimeout(() => {
      event.component.items = this.filterPorts(text);
      event.component.endSearch();
    }, 500);
  }

  filterPorts(text: string) {
    return this.paises.filter(pais => {
      return pais.paisNOMBRE.toLowerCase().indexOf(text) !== -1;
    });
  }

}
