import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionServiceService } from 'src/app/validator/validacion-service.service';
import { NegoziService } from '../../../../../services/negozi.service';
import { CargandoService } from '../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import * as moment from 'moment';

@Component({
  selector: 'app-cambiar-horario',
  templateUrl: './cambiar-horario.component.html',
  styleUrls: ['./cambiar-horario.component.scss'],
})
export class CambiarHorarioComponent {

  @Input() uuid;
  @Input() horarios: any = [];


  formulario: FormGroup = this.formBuilder.group({
    dia: new FormControl('', [
      Validators.required
    ]),
    jornada: new FormControl('', [
      Validators.required
    ])
  });

  formularioJUAM: FormGroup = this.formBuilder.group({
    horaInicio: new FormControl('', [
      Validators.required
    ]),
    horaFinal: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: [
      this.validaciones.validarDosFechasUno('horaInicio', 'horaFinal')
    ]
  });

  formularioJUPM: FormGroup = this.formBuilder.group({
    horaInicio: new FormControl('', [
      Validators.required
    ]),
    horaFinal: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: [
      this.validaciones.validarDosFechasUno('horaInicio', 'horaFinal')
    ]
  });

  formularioJD: FormGroup = this.formBuilder.group({
    horaInicioAM: new FormControl('', [
      Validators.required
    ]),
    horaFinalAM: new FormControl('', [
      Validators.required
    ]),
    horaInicioPM: new FormControl('', [
      Validators.required
    ]),
    horaFinalPM: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: [
      this.validaciones.validarDosFechasDos('horaInicioAM', 'horaFinalAM'),
      this.validaciones.validarDosFechasTres('horaInicioPM', 'horaFinalPM'),
    ]
  });

  
  dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

  jornadas = [ 'JORNADAUNICA', 'JORNADADOBLE', 'COMPLETA', 'CERRADO' ];

  activarSelectJornadas: boolean = false;
  activarTipoDeJornada: string = "";


  jornadaUnica = null;
  constructor(
    private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private validaciones: ValidacionServiceService,
    private negoziService: NegoziService,
    private cargandoService: CargandoService
  ) {
   }
  salir() {
    this.popoverController.dismiss({data: false});
  }
  completado() {
    this.popoverController.dismiss({data: true});
  }

  campoNoValidoUno(campo: string) {
    return this.formularioJUAM.get(campo)?.invalid && this.formularioJUAM.get(campo)?.touched;
  }
  campoNoValidoDos(campo: string) {
    return this.formularioJUPM.get(campo)?.invalid && this.formularioJUPM.get(campo)?.touched;
  }
  campoNoValidoTres(campo: string) {
    return this.formularioJD.get(campo)?.invalid && this.formularioJD.get(campo)?.touched;
  }

  get diaCreado() {
    let dia = this.horarios.find(horario => horario.empresa_horarioDIA == this.formulario.controls.dia.value);
    if (dia) return true;
    else return false;
  }
  get uuidDia() {
    let dia = this.horarios.find(horario => horario.empresa_horarioDIA == this.formulario.controls.dia.value);
    return dia.uuid;
  }
  formatoHoras(fecha) {
    return moment(fecha).format('HH:mm');
  }

  agregarJornada() {
    if (!this.diaCreado) this.crearNuevoHorarioJornadaCompletaOCerrada();
    else this.cambiarNuevoHorarioJornadaCompletaOCerrada();
  }
  agregarHorarioJornadaDoble() {
    if (!this.diaCreado) this.crearNuevoHorarioJornadaDoble();
    else this.cambiarNuevoHorarioJornadaDoble();
  }
  agregarHorarioJornadaUnica() {
    if (this.jornadaUnica == 'am') {
      if (!this.diaCreado) this.crearNuevoHorarioJornadaUnicaAM();
      else this.cambiarNuevoHorarioJornadaUnicaAM();
    } else {
      if (!this.diaCreado) this.crearNuevoHorarioJornadaUnicaPM();
      else this.cambiarNuevoHorarioJornadaUnicaPM();
    }
  }


  crearNuevoHorarioJornadaCompletaOCerrada() {
    this.cargandoService.iniciaCargando();
    this.negoziService.crearJornadaCompletaOCerrada(
      this.uuid,
      this.formulario.controls.dia.value,
      this.formulario.controls.jornada.value
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    });
  }
  cambiarNuevoHorarioJornadaCompletaOCerrada() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarJornadaCompletaOCerrada(
      this.uuidDia,
      this.formulario.controls.jornada.value
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
  }

  crearNuevoHorarioJornadaDoble() {
    this.cargandoService.iniciaCargando();
    this.negoziService.crearHorarioJornadaDoble(
      this.uuid,
      this.formulario.controls.dia.value,
      this.formulario.controls.jornada.value,
      this.formatoHoras(this.formularioJD.controls.horaInicioAM.value),
      this.formatoHoras(this.formularioJD.controls.horaFinalAM.value),
      this.formatoHoras(this.formularioJD.controls.horaInicioPM.value),
      this.formatoHoras(this.formularioJD.controls.horaFinalPM.value)
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
  }
  cambiarNuevoHorarioJornadaDoble() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarHorarioJornadaDoble(
      this.uuidDia,
      this.formulario.controls.jornada.value,
      this.formatoHoras(this.formularioJD.controls.horaInicioAM.value),
      this.formatoHoras(this.formularioJD.controls.horaFinalAM.value),
      this.formatoHoras(this.formularioJD.controls.horaInicioPM.value),
      this.formatoHoras(this.formularioJD.controls.horaFinalPM.value)
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
  }


  crearNuevoHorarioJornadaUnicaAM() {
    this.cargandoService.iniciaCargando();
    this.negoziService.crearHorarioJornadaUnica(
      this.uuid,
      this.formulario.controls.dia.value,
      this.formulario.controls.jornada.value,
      this.formatoHoras(this.formularioJUAM.controls.horaInicio.value),
      this.formatoHoras(this.formularioJUAM.controls.horaFinal.value)
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
  }
  cambiarNuevoHorarioJornadaUnicaAM() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarHorarioJornadaUnica(
      this.uuidDia,
      this.formulario.controls.jornada.value,
      this.formatoHoras(this.formularioJUAM.controls.horaInicio.value),
      this.formatoHoras(this.formularioJUAM.controls.horaFinal.value),
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
  }


  crearNuevoHorarioJornadaUnicaPM() {
    this.cargandoService.iniciaCargando();
    this.negoziService.crearHorarioJornadaUnica(
      this.uuid,
      this.formulario.controls.dia.value,
      this.formulario.controls.jornada.value,
      this.formatoHoras(this.formularioJUPM.controls.horaInicio.value),
      this.formatoHoras(this.formularioJUPM.controls.horaFinal.value),
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
  }
  cambiarNuevoHorarioJornadaUnicaPM() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarHorarioJornadaUnica(
      this.uuidDia,
      this.formulario.controls.jornada.value,
      this.formatoHoras(this.formularioJUPM.controls.horaInicio.value),
      this.formatoHoras(this.formularioJUPM.controls.horaFinal.value),
    ).subscribe((data: any) => {
      this.completado();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true); 
    })
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
