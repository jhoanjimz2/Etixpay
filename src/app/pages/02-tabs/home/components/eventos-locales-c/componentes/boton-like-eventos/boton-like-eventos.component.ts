import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { HomeService } from '../../../../../../../services/home.service';

@Component({
  selector: 'app-boton-like-eventos',
  templateUrl: './boton-like-eventos.component.html',
  styleUrls: ['./boton-like-eventos.component.scss'],
})
export class BotonLikeEventosComponent implements OnInit {
  @Input() evento: any;  
  @Input() eventos_all: any;
  @Input() eventos_mios: any;
  @Input() eventos_likes: any;
  @Input() bandera = false;
  cargando = false;

  constructor(
    private popover_controller: PopoverController,
    private homeService: HomeService
    ) { }

  ngOnInit() {}

  like() {
    this.cargando = true;
    this.homeService.like_a_un_evento(this.evento.id).subscribe((data: any) => {
      this.like_activo();
      this.cargando = false;
    }, error => {
      this.cargando = false;
      this.Alert(error.error.message, 'OK', true);
    })
  }

  dislike() {
    this.cargando = true;
    this.homeService.like_a_un_evento(this.evento.id).subscribe((data: any) => {
      this.like_inactivo();
      this.cargando = false;
    }, error => {
      this.cargando = false;
      this.Alert(error.error.message, 'OK', true);
    })
  }
  like_activo() {
    if (this.evento.likes[0]) this.evento.likes[0].evento_likeESTADO = 'ACTIVO';
    if (!this.evento.likes[0]) this.evento.likes.push({'eventoID': this.evento.id,'evento_likeESTADO': 'ACTIVO'});
    if (this.bandera) return;
    
    let eventos_all = this.eventos_all.find(evento => evento.id == this.evento.id);
    if (eventos_all && eventos_all.likes[0]) eventos_all.likes[0].evento_likeESTADO = 'ACTIVO';
    if (eventos_all && !eventos_all.likes[0]) eventos_all.push({'eventoID': this.evento.id,'evento_likeESTADO': 'ACTIVO'});

    let eventos_mios = this.eventos_mios.find(evento => evento.id == this.evento.id);
    if (eventos_mios && eventos_mios.likes[0]) eventos_mios.likes[0].evento_likeESTADO = 'ACTIVO';
    if (eventos_mios && !eventos_mios.likes[0]) eventos_mios.push({'eventoID': this.evento.id,'evento_likeESTADO': 'ACTIVO'});

    this.eventos_likes.push(this.evento);
  }
  like_inactivo() {
    this.evento.likes[0].evento_likeESTADO = 'INACTIVO';
    if (this.bandera) return;

    let eventos_all = this.eventos_all.find(evento => evento.id == this.evento.id);
    if (eventos_all) eventos_all.likes[0].evento_likeESTADO = 'INACTIVO';

    let eventos_mios = this.eventos_mios.find(evento => evento.id == this.evento.id);
    if (eventos_mios) eventos_mios.likes[0].evento_likeESTADO = 'INACTIVO';

    this.eventos_likes.splice(this.buscar_evento_likes(), 1);
    

  }
  buscar_evento_likes() {
    return this.eventos_likes.indexOf(this.evento)
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
