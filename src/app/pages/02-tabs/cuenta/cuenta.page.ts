import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { CuentaService } from '../../../services/cuenta.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;
  tipo_id;

  constructor(
    private cuenta_service: CuentaService,
    private settingsService: SettingsService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.cargar_tipo_user();
  }
  ionViewWillEnter() {
    this.settingsService.default();
  }
  ngOnDestroy(): void {
    this.modalController.dismiss();
  }
  cargar_tipo_user() {
    switch (this.tipo_user) {
      case 3:
        this.tipo_persona();
      break;
      case 6:
        this.tipo_colaborador();
      break;
      default:
        this.tipo_empresa();
      break;
    }
  }
  tipo_persona() {
    this.cuenta_service.qr_persona().subscribe((data: any) => {
      this.tipo_id = data.data.tipo_usuarioID;
    },  error => {});
  }
  tipo_empresa() {
    this.cuenta_service.qr_empresas().subscribe((data: any) => {
      this.tipo_id = data.data.empresa.empresaTIPO;
    },  error => {});
  }
  tipo_colaborador() {
    this.cuenta_service.qr_colaboradores().subscribe((data: any) => {
      this.tipo_id = data.data.tipo_usuarioID;
    },  error => {});
  }

}
