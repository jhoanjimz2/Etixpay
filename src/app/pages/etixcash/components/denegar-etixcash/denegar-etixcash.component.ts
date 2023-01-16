import { Component, Input, OnInit } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { CuentaService } from '../../../../services/cuenta.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-denegar-etixcash',
  templateUrl: './denegar-etixcash.component.html',
  styleUrls: ['./denegar-etixcash.component.scss'],
})
export class DenegarEtixcashComponent implements OnInit {
  @Input() uuid;
  @Input() wallet;
  formulario;

  constructor(
    private popover_controller: PopoverController,
    private cargando_service: CargandoService,
    private form_builder: FormBuilder,
    private cuenta_service: CuentaService
  ) { }

  ngOnInit() {
    this.cargar_formulario();
  }
  salir_sin_argumentos() {
    this.popover_controller.dismiss({data: false});
  }
  salir_con_argumentos() {
    this.popover_controller.dismiss({data: true});
  }
  cargar_formulario() {
    this.formulario = this.form_builder.group({
      wallet: new FormControl(this.wallet, [
        Validators.required
      ]),
      mensaje: new FormControl('', [
        Validators.required
      ]),
    });
  }
  denegar() {
    this.cargando_service.iniciaCargando();
    this.cuenta_service.movimientos_denegar(localStorage.getItem('wallet'), this.uuid, this.formulario.controls.mensaje.value).subscribe( (datos: any) => {
      this.cargando_service.terminaCargando();
      this.salir_con_argumentos();
    },error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async Alert(tex, bot, bol) {
    const popover = await this.popover_controller.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: bol
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
