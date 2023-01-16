import { Component, Input, EventEmitter, Output } from '@angular/core';
import { timer } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DescripcionEventoComponent } from '../../../02-tabs/home/components/eventos-locales-c/componentes/descripcion-evento/descripcion-evento.component';
import { ComprarTicketEventoComponent } from '../../../02-tabs/home/components/eventos-locales-c/componentes/comprar-ticket-evento/comprar-ticket-evento.component';
import { SoyPropietarioComponent } from '../soy-propietario/soy-propietario.component';
import { MapaService } from '../../../../services/mapa.service';
import { CargandoService } from '../../../../services/cargando.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-objeto',
  templateUrl: './card-objeto.component.html',
  styleUrls: ['./card-objeto.component.scss'],
})
export class CardObjetoComponent { 
  @Input() objeto: any = null;
  @Output() actualizarVotos: EventEmitter<any> = new EventEmitter();
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
  
  porcentaje = environment.comisionPorcentaje;

  votante = JSON.parse(localStorage.getItem('user')).username;

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
    private router: Router,
    private mapaService: MapaService,
    private cargandoService: CargandoService
  ) { }

  
  ngOnInit() {
    if (this.objeto.tipo == 'invers') this.iniciar_reloj();
  }
  iniciar_reloj() {
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date(this.objeto.proyectoFECHAFINAL);
      this.end.setDate(this.end.getDate());
      this.end.setHours(this.end.getHours());
      this.showDate();
    });
  }
  img_objeto(img) {
    if (img) return img;
    return 'assets/img_predefinidas/Bussines_cuadrada.png';
  }
  get punto_recompensa() {
    if (this.objeto.empresa.commisions) { 
      return (parseFloat(this.objeto.empresa.comisionWALLET) * parseFloat(this.objeto.empresa.commisions.empresa_distribucion_comisionPUNTORECOMENSA)) / this.porcentaje;
    }
    return 0;
  }
  
  irNegoziPage() {
    this.modalController.dismiss();
    this.router.navigate(["/pages/negozi/store-page/"+ this.objeto.empresa.uuid]);
  }

  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }
  comprar_ticket_proyecto(proyecto) {
    this.router.navigate(['/pages/invest/buy-invest'], { queryParams: { order: JSON.stringify(proyecto) } });
  }
  async descripcion_del_evento() {
    const modal = await this.modalController.create({
      component: DescripcionEventoComponent,
      componentProps: {
        evento: this.objeto
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async comprar_ticket_evento() {
    const modal = await this.modalController.create({
      component: ComprarTicketEventoComponent,
      componentProps: {
        detalle_evento: this.objeto.events_tickets_details,
        boton_seleccionado: this.objeto.events_tickets_details[0],
        event_wallet: this.objeto.user.wallets[0].walletCODIGO
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  get precio_standart() {
    let codigo;
    codigo = this.objeto.events_tickets_details.find(detalle_ticket => detalle_ticket.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
    return codigo.evento_ticket_detallePRECIO;
  }


  async soyPropietario() {
    const popover = await this.popoverController.create({
      component: SoyPropietarioComponent,
      cssClass: 'popover-propietario',
      componentProps: {
        objeto: this.objeto
      },
      mode: 'ios',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) if (data.data) this.seAgregoPropietario();
  }
  seAgregoPropietario() {
    this.objeto.empresa_sugerenciaPROPIETARIO = 1;
  }
  votar() {
    if (this.vota) return;
    this.cargandoService.iniciaCargando();
    this.mapaService.votarTiendaSugerida(this.objeto.uuid).subscribe((data: any) => {
      this.objeto.company_suggestion_votes.push({user: {email: this.votante}});
      this.objeto.count_votes += 1;
      this.actualizarVotos.emit(this.objeto.count_votes);
      this.cargandoService.terminaCargando();
    }, error => {
      this.cargandoService.terminaCargando();
      console.log(error);
    })
  }
  get vota() {
    if (this.buscaEmail) return true;
    return false;
  }
  get buscaEmail() {
    let votante = this.objeto.company_suggestion_votes.find(votantes => votantes.user.email == this.votante);
    if (votante) return true;
    else return false;
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

