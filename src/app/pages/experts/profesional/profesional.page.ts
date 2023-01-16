import { Component } from '@angular/core';
import { CargandoService } from '../../../services/cargando.service';
import { Profesional } from './interface/experts.model';
import { ExpertsService } from '../../../services/experts.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { EditInfoPerfilComponent } from './components/edit-info-perfil/edit-info-perfil.component';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.page.html',
  styleUrls: ['./profesional.page.scss'],
})
export class ProfesionalPage {

  uuid: string = "";

  editar: boolean = false;
  toggle: boolean = true;
  localEmail = JSON.parse(localStorage.getItem('user')).username;

  profesional: Profesional = new Profesional();

  constructor( 
    private navController: NavController,
    public route: ActivatedRoute,
    private cargandoService: CargandoService,
    private expertsService: ExpertsService,
    private popoverController: PopoverController
  ) { 
    this.route.queryParams.subscribe( params => {
      this.uuid = params.uuid;
      this.getProfesionalesProfile(params);
    })
  }
  ngOnDestroy() {
    if (this.popoverController.getTop()) {
      this.popoverController.dismiss({data: false})
    }
  }

  getProfesionalesProfile(params) {
    this.expertsService.getProfesionalesProfile(params.uuid).subscribe((data: any) => {
      this.profesional = data.data;
      if(params.editar)  {
        this.editar = params.editar;
      }
    }, error => {
      this.navController.back();
    })
  }
  getProfesionalesProfileEdit() {
    this.expertsService.getProfesionalesProfile(this.uuid).subscribe((data: any) => {
      this.profesional = data.data;
    }, error => {
      this.navController.back();
    })
  }

  editarChange(event) {
    this.editar = event;
  }
  cargarInfoPrincipal(bandera = false) {
    this.getProfesionalesProfileEdit()
    if (bandera) this.cargandoService.terminaCargando();
  }
  cargarGalery(bandera = false) {
    this.getProfesionalesProfileEdit()
    if (bandera) this.cargandoService.terminaCargando();
  }

  async abrirEdicion() {
    const popover = await this.popoverController.create({
      component: EditInfoPerfilComponent,
      cssClass: 'popoverEditProfesional',
      mode: 'ios',
      componentProps: { profesional: this.profesional, uuid: this.uuid },
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.data) this.getProfesionalesProfileEdit();
  }

}
