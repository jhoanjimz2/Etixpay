import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataHistory } from 'src/app/models/community/historyResponse.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { ServicesCommunity } from 'src/app/services/community.service';
import { RememberInfoComponent } from '../remember-info/remember-info.component';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {

  nroMonth = 0;
  date = new Date();
  historys: DataHistory[] = [];
  @Output ('setModalInfoDev') setModalInfoDev: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public popoverController: PopoverController,
    private servicesCommunity: ServicesCommunity,
    private cargandoService: CargandoService
  ) {
    this.nroMonth = this.date.getMonth() + 1;
   }

  ngOnInit() {
    this.getInfoHistory();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: RememberInfoComponent,
      cssClass: 'popover-commnunity-movements',
      event: ev,
      translucent: false
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
  }

  getInfoHistory() {
    this.cargandoService.iniciaCargando();
    this.servicesCommunity.getInfoHistory().subscribe(
      (response) => {
        this.historys = response.data.data;
        this.cargandoService.terminaCargando();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  showModal() {
    this.setModalInfoDev.emit(true);
  }

}
