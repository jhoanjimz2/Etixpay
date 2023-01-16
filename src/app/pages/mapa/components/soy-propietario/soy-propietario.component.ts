import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionServiceService } from 'src/app/validator/validacion-service.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MapaService } from 'src/app/services/mapa.service';
import { CargandoService } from 'src/app/services/cargando.service';

@Component({
  selector: 'app-soy-propietario',
  templateUrl: './soy-propietario.component.html',
  styleUrls: ['./soy-propietario.component.scss'],
})
export class SoyPropietarioComponent {
  @Input() objeto: any;

  formulario: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [
      Validators.required
    ]),
    telefono: new FormControl('', [
      Validators.required,
      ,Validators.pattern(this.validaciones.numerico_pattern)
    ])
  });

  constructor(
    private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private validaciones: ValidacionServiceService,
    private mapaService: MapaService,
    private cargandoService: CargandoService
  ) { }

  salir() {
    this.popoverController.dismiss({data: false});
  }
  salirConArgumentos() {
    this.popoverController.dismiss({data: true});
  }


  agregarPropietario() {
    this.cargandoService.iniciaCargando();
    this.mapaService.soyPropietario(this.objeto.uuid, this.formulario.controls.nombre.value, this.formulario.controls.telefono.value).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.salirConArgumentos();
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async Alert(tex, bot, tipo) {
    const popover = await this.popoverController.create({
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
