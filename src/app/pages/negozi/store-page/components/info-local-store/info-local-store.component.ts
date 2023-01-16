import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TixEuroAnimalComponent } from '../tix-euro-animal/tix-euro-animal.component';
import { NegoziService } from '../../../../../services/negozi.service';
import { CambiarHorarioComponent } from '../cambiar-horario/cambiar-horario.component';
import * as moment from 'moment';

@Component({
  selector: 'app-info-local-store',
  templateUrl: './info-local-store.component.html',
  styleUrls: ['./info-local-store.component.scss'],
})
export class InfoLocalStoreComponent {
  @Output() actualizarInformation: EventEmitter<any> = new EventEmitter();
  @Input() informacionLocal: any = [];
  @Input() horarios: any = [];
  @Input() editar = false;
  @Input() uuid: string = "";
  botonHorario = false;


  dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

  constructor(
    private popoverController: PopoverController,
    private negoziService: NegoziService
  ) {}

  async actualizarInfo() {
    if (!this.editar) return;
    const popover = await this.popoverController.create({
      component: TixEuroAnimalComponent,
      cssClass: 'popoverTEA',
      backdropDismiss: true,
      componentProps: {
        informacionLocal: this.informacionLocal,
        uuid: this.uuid
      }
    });
    await popover.present();
    let data = await popover.onDidDismiss();
    this.actualizarInformation.emit();
  }
  async horario() {
    if (!this.editar) return this.botonHorario = !this.botonHorario;
    this.botonHorario = false;
    const popover = await this.popoverController.create({
      component: CambiarHorarioComponent,
      cssClass: 'popover-horario',
      componentProps: {
        uuid: this.uuid,
        horarios: this.horarios
      },
      backdropDismiss: true
    });
    await popover.present();
    let data = await popover.onDidDismiss();
    if (data) if (data.data) this.actualizarInformation.emit();
  }
  
  get apertura() {
    let horario = this.horarios.find(horario => horario.empresa_horarioDIA == this.dias[new Date().getDay() - 1]);

    if (!horario) return false;

    if (horario.empresa_horarioJORNADA == 'CERRADO') return false;

    if (horario.empresa_horarioJORNADA == 'COMPLETA') return true;

    if (horario.empresa_horarioJORNADA == 'JORNADAUNICA') {
      if (
        this.formatoHoras(horario.empresa_horarioHORAAPERTURA) < this.formatoHoras(new Date()) && 
        this.formatoHoras(horario.empresa_horarioHORACIERRE) > this.formatoHoras(new Date())
      ) return true;
      else return false;
    }

    if (horario.empresa_horarioJORNADA == 'COMPLETA') {
      if ( 
        this.formatoHoras(horario.empresa_horarioHORAAPERTURA) < this.formatoHoras(new Date()) &&  
        this.formatoHoras(horario.empresa_horarioHORACIERRE) > this.formatoHoras(new Date()) ) {
         return true; 
      } else if (
        this.formatoHoras(horario.empresa_horarioHORAAPERTURASECUNDARIA) < this.formatoHoras(new Date()) &&  
        this.formatoHoras(horario.empresa_horarioHORACIERRESECUNDARIA) > this.formatoHoras(new Date()) ) {
        return true; 
      }
      else return false;
      
    }



  }


  formatoHoras(fecha) {
    return moment(fecha).format('HH:mm');
  }

}
