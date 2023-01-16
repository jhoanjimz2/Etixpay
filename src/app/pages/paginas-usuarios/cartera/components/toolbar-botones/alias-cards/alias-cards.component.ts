import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertComponent } from '../../../../../../shared/alert/alert.component';
import { CarterasService } from '../../../carteras.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alias-cards',
  templateUrl: './alias-cards.component.html',
  styleUrls: ['./alias-cards.component.scss'],
})
export class AliasCardsComponent implements OnInit {
  @Input() cardNumber;
  formulario;

  constructor(
    private popover_controller: PopoverController,
    private cartera_service: CarterasService,
    private cargando_service: CargandoService,
    private form_builder: FormBuilder
    ) { }

  ngOnInit() {
    this.cargar_formulario();
  }
  cargar_formulario() {
    this.formulario = this.form_builder.group({
      alias: new FormControl('', [
        Validators.required
      ])
    });
  }
  cambiar_alias() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.cambiar_alias(this.cardNumber,this.formulario.controls.alias.value).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      this.popover_controller.dismiss({data: true});
      this.Alert(data.message, 'OK' , false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK' , true);
    })
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
