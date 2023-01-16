import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SelectCantidadComponent } from '../../../../../../shared/select-cantidad/select-cantidad.component';

@Component({
  selector: 'app-top-up-card',
  templateUrl: './top-up-card.component.html',
  styleUrls: ['./top-up-card.component.scss'],
})
export class TopUpCardComponent implements OnInit {
  @Input() modal;
  @Input() wallet_card;
  botones = [
    {valor: 2000, size: 12},
    {valor: 1000, size: 7},
    {valor: 500, size: 5},
    {valor: 200, size: 4.5},
    {valor: 100, size: 4.5},
    {valor: 50, size: 3}
  ]
  prev_select = [
    {seleccionado: false, id: null}
  ];
  opcion = 1;
  cantidad = 0;

  constructor(
    private modal_controller: ModalController,
    private popover_controller: PopoverController
  ) { }

  ngOnInit() {}
  salir_sin_argumentos() {
    this.modal_controller.dismiss();
  }
  salir_con_argumentos() {
    this.modal_controller.dismiss({data: true});
  }
  async cantidad_popover() {
    const popover = await this.popover_controller.create({
      component: SelectCantidadComponent,
      cssClass: 'popoverCantidad',
      mode: 'ios',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.datos) this.cantidad = data.cantidad ;
  }
  click(id) {
    this.opcion = id;
    if (id == 1) this.modal.cssClass = 'modal_recargas'; 
    if (id == 2) this.modal.cssClass = 'modal_recargas_cerrado'; 
    if (id == 3) this.modal.cssClass = 'modal_recargas_abierto_top_up'; 
    if (id == 4) this.modal.cssClass = 'modal_recargas_abierto'; 
  }

}
