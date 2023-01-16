import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomeService } from '../../../../services/home.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invest-home',
  templateUrl: './invest-home.component.html',
  styleUrls: ['./invest-home.component.scss'],
})
export class InvestHomeComponent implements OnInit{
  proyectos: any = [];
  tipo_user = JSON.parse(localStorage.getItem('user'));
  back_groundcolor = "";

  constructor(
    private homeService: HomeService,
    private popoverController: PopoverController,
    private router: Router
    ) { 
  }
  ngOnInit(): void {
    this.cargarLocales(); 
  }
  cargarLocales() {
    switch (this.tipo_user.tipoUsuario) {
      case 3:
        this.localsPersona();
      break;
      default:
        this.localsEmpresa();
      break;
    }
  }
  localsPersona() {
    this.homeService.localsPersona().subscribe( (data: any) => {
      this.proyectos = data.data.locals;
    }, error => {
      this.Alert(error.error.message, 'OK', true);
    })
  }
  localsEmpresa() {
    this.homeService.localsEmpresa().subscribe( (data: any) => {
      this.proyectos = data.data.locals;
    }, error => {
      this.Alert(error.error.message, 'OK', true);
    })
  }
  inversiones() {
    this.router.navigate(["/pages/invest/local-invest"]);
  }
  comprar_ticket_proyecto(proyecto) {
    this.router.navigate(['/pages/invest/buy-invest'], { queryParams: { order: JSON.stringify(proyecto) } });
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
