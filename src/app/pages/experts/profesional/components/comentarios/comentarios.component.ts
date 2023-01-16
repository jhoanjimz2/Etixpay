import { Component,EventEmitter,Input, Output } from '@angular/core';
import { AddComentarioComponent } from '../add-comentario/add-comentario.component';
import { ModalController } from '@ionic/angular';
import { Profesional } from '../../interface/experts.model';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent {
  @Output() cargarComentarios: EventEmitter<any> = new EventEmitter();
  @Input() profesional: Profesional = new Profesional();
  @Input() uuid: string;
  user = JSON.parse(localStorage.getItem('user')).username;

  constructor(
    private modalController: ModalController
  ) {}

  async addComments() {
    const modal = await this.modalController.create({
      component: AddComentarioComponent,
      cssClass: 'modal_add_comentario_tienda',
      componentProps: {
        uuid: this.uuid
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) this.cargarComentarios.emit();
  }
}
