import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../../../../../../services/home.service';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { CargandoService } from '../../../../../../../services/cargando.service';

@Component({
  selector: 'app-regalar-ticket',
  templateUrl: './regalar-ticket.component.html',
  styleUrls: ['./regalar-ticket.component.scss'],
})
export class RegalarTicketComponent implements OnInit {
  @Input() ticket: any;
  @Input() tickets_comprados: any;
  formulario;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private popover_controller: PopoverController,
    private cargandoService: CargandoService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargar_formulario();
  }
  salir() {
    this.modalController.dismiss({data: true});
  }
  cargar_formulario() {
    this.formulario = this.formBuilder.group({
      recipiente: new FormControl('', [
        Validators.required
      ]),
      mensage: new FormControl('', [
        Validators.required
      ]),
      check: new FormControl(false, [
        Validators.required
      ])
    });
  }
  regalar_voucher() {
    this.cargandoService.iniciaCargando();
    this.homeService.regalar_voucher(this.ticket.id, this.formulario.controls.recipiente.value).subscribe( (data: any) => {
      this.cargandoService.terminaCargando();
      if (!data.data) return this.Alert(data.message, 'OK', true);
      this.quitar_voucher_regalado(); 
      this.salir();
      setTimeout( () =>this.salir(), 1000);
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  quitar_voucher_regalado() { this.tickets_comprados.splice(this.buscar_voucher(), 1) }
  buscar_voucher() { return this.tickets_comprados.indexOf(this.ticket) }
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
