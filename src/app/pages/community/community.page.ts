import { Component, OnInit } from '@angular/core';
import { CommunityMainRespose } from 'src/app/models/community/community-main-response.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { ServicesCommunity } from 'src/app/services/community.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {

  nroButton = 1;
  modalInfo = false;
  modalInfoDev = false;
  typeModalInfo = '';
  share = false;
  commnunityMain: CommunityMainRespose = new CommunityMainRespose();
  codeUser = '';

  constructor(
    private servicesCommunity: ServicesCommunity,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getInfoCommunityMain();
    this.getInfoUserCode();
    this.nroButton = 1;
  }
  ngOnDestroy(): void {
    this.modalController.dismiss();
  }

  getInfoCommunityMain() {
    this.servicesCommunity.getInfoCommunityMain().subscribe(
      (response) => {
        this.commnunityMain = response;
      }
    );
  }

  getNroButton(res: number) {
    this.nroButton = res;
  }

  getModalInfo(res: boolean) {
    this.modalInfo = res;
  }

  getTypeModalInfo(res: string) {
    this.typeModalInfo = res;
  }

  getShare(res: boolean) {
    this.share = res;
  }

  getModalInfoDev(res: boolean) {
    this.modalInfoDev = res;
  }

  getInfoUserCode() {
    this.servicesCommunity.getInfoUserCode().subscribe(
      (response: any) => {
        this.codeUser = response.data.usuarioCODIGO;
      }
    );
  }

}
