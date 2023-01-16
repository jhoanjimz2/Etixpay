import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommunityMainRespose } from 'src/app/models/community/community-main-response.model';
import { CommunityNetworkRespose } from 'src/app/models/community/community-network-response.model';
import { PersonaPerfil } from 'src/app/models/community/network-directc-hildren-response.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { ServicesCommunity } from 'src/app/services/community.service';

@Component({
  selector: 'app-community-in',
  templateUrl: './community-in.component.html',
  styleUrls: ['./community-in.component.scss'],
})
export class CommunityInComponent implements OnInit {

  @Input('share') share = false;
  @Input('commnunityMain') commnunityMain: CommunityMainRespose = new CommunityMainRespose();
  @Output ('setShare') setShare: EventEmitter<boolean> = new EventEmitter<boolean>();
  level = 0;
  levelPerc = 0;
  myProfit = 0;
  communityNetwork: CommunityNetworkRespose = new CommunityNetworkRespose();
  profile: PersonaPerfil = {} as PersonaPerfil;


  constructor(
    private servicesCommunity: ServicesCommunity,
    private cargandoService: CargandoService
  ) { }

  ngOnInit() {
    this.getInfoCommunityNetwork();
    this.level = parseInt(this.commnunityMain.data.level.punto_recompensa_nivelTITULO);
    this.levelPerc = parseFloat(this.commnunityMain.data.level.punto_recompensa_nivelPORCENTAJE);
    this.myProfit = parseFloat(this.commnunityMain.data.punto_recompensaGANANCIA);
  }

  getInfoCommunityNetwork() {
    this.cargandoService.iniciaCargando();
    this.servicesCommunity.getInfoCommunityNetwork().subscribe(
      (response) => {
        this.communityNetwork = response;
        this.getInfoNetworkDirect();
        this.cargandoService.terminaCargando();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  getInfoNetworkDirect() {
    this.servicesCommunity.getInfoNetworkDirect().subscribe(
      response => {
        this.profile = response.data.me.user.persona;
      }
    );
  }

  toShare() {
    this.setShare.emit(true);
  }

  

}
