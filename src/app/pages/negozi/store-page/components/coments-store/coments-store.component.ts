import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../../services/cargando.service';
import { NegoziService } from '../../../../../services/negozi.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-coments-store',
  templateUrl: './coments-store.component.html',
  styleUrls: ['./coments-store.component.scss'],
})
export class ComentsStoreComponent {
  @Output() actualizarComents: EventEmitter<any> = new EventEmitter();
  @Input() coments: any = [];
  @Input() ponderado: number = 0;
  @Input() uuid: string = "";
  @Input() emailStore: string = "";
  user = JSON.parse(localStorage.getItem('user')).username;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private cargandoService: CargandoService,
    private alertController: AlertController,
    private negoziService: NegoziService,
    private translate: TranslateService
  ) {
  }
  ngOnChanges() {
    if (this.coments.length) this.rellenarDatos();
  }
  rellenarDatos() {
    this.coments.forEach(comentario => {
      if (comentario.cliente.empresa) {
        if(comentario.cliente.empresa.empresaNOMBREMAP) comentario['nombre'] = comentario.cliente.empresa.empresaNOMBREMAP;
        if(!comentario.cliente.empresa.empresaNOMBREMAP) comentario['nombre'] = comentario.cliente.email;
        if(comentario.cliente.empresa.empresaFOTO) comentario['imagen'] = comentario.cliente.empresa.empresaFOTO;
        if(!comentario.cliente.empresa.empresaFOTO) comentario['imagen'] = 'assets/negozi/perfil.png';
      }
      if (comentario.cliente.persona) {
        if(comentario.cliente.persona.personaNOMBRES) comentario['nombre'] = comentario.cliente.persona.personaNOMBRES;
        if(!comentario.cliente.persona.personaNOMBRES) comentario['nombre'] = comentario.cliente.email;
        if(comentario.cliente.persona.personaFOTO) comentario['imagen'] = comentario.cliente.persona.personaFOTO;
        if(!comentario.cliente.persona.personaFOTO) comentario['imagen'] = 'assets/negozi/perfil.png';
      }    
    });
  }


  async addComments() {
    const modal = await this.modalController.create({
      component: CommentComponent,
      cssClass: 'modal_add_comentario_tienda',
      componentProps: {
        uuid: this.uuid
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) this.actualizarComents.emit();
  }
  async deleteTrash(uuid) {
    let header, cancel;
    this.translate.get('AREYOUSURE').subscribe(value => { header = value; });
    this.translate.get('CANCELN').subscribe(value => { cancel = value; });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      mode:'ios',
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.eliminarComentario(uuid);
          }
        }
      ]
    });
    await alert.present();
  }
  eliminarComentario(uuid) {
    this.cargandoService.iniciaCargando();
    this.negoziService.eliminarComentario(uuid).subscribe( (datos: any) => {
      this.actualizarComents.emit();
      this.cargandoService.terminaCargando();
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
