import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommunityMainRespose, LevelCommunityMain, UserMainCommunity } from 'src/app/models/community/community-main-response.model';
import { ListMyLevel } from 'src/app/models/community/list-level-response.model';
import { ListPeriod } from 'src/app/models/community/list-period-response.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { ServicesCommunity } from 'src/app/services/community.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  nroMonth = 0;
  date = new Date();
  commnunityMain: CommunityMainRespose = new CommunityMainRespose();
  levelCommunityMain :LevelCommunityMain = new LevelCommunityMain();
  CRP = 0;
  valueProgressBar = 0;
  valuePercProgressBar = 0;
  valueBrand = 0;
  listMyLevel: ListMyLevel[];
  myLevel: ListMyLevel = new ListMyLevel();
  singNextLevel = 0;
  levelMinPay = 0;
  positionBrand = 0;
  widthProgressBar = 0;
  listPeriod: ListPeriod[] = [];
  @Output ('setModalInfo') setModalInfo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output ('setTypeModalInfo') setTypeModalInfo: EventEmitter<string> = new EventEmitter<string>();
  @Output ('setCommnunityMain') setCommnunityMain: EventEmitter<CommunityMainRespose> = new EventEmitter<CommunityMainRespose>();
  levelsProgressBar = [
    { level: 1, RP: 10, maxRP: 50 },
    { level: 2, RP: 10, maxRP: 50 },
    { level: 3, RP: 10, maxRP: 50 },
    { level: 4, RP: 20, maxRP: 50 },
    { level: 5, RP: 30, maxRP: 50 },
    { level: 6, RP: 40, maxRP: 50 },
    { level: 7, RP: 150, maxRP: 50 },
    { level: 8, RP: 750, maxRP: 50 },
    { level: 9, RP: 1500, maxRP: 50 }
  ];

  constructor(
    private servicesCommunity: ServicesCommunity,
    private cargandoService: CargandoService
  ) {
    this.nroMonth = this.date.getMonth() + 1;
  }

  ngOnInit() {
    this.getInfoCommunityMain();
  }


  ngDoCheck() {
    const progressBar = document.getElementById("progress-bar-pr");
    this.widthProgressBar = progressBar.clientWidth;
    this.positionBrand = this.getPostionBrand(this.valuePercProgressBar, progressBar.clientWidth);
  }

  getScroll(level: number) {
    let elementScroll: HTMLElement = document.getElementById("card-slide");
    if (elementScroll.clientWidth < 400) {
      if (level >= 2) {
        elementScroll.scrollLeft = (46) + (106 * (level + -1)) + (level * level);
      }
    }
  }

  getInfoCommunityMain() {
    this.cargandoService.iniciaCargando();
    this.servicesCommunity.getInfoCommunityMain().subscribe(
      (response) => {
        this.commnunityMain = response;
        this.CRP = parseFloat(this.commnunityMain.data.punto_recompensaVOLUMEN) +  parseFloat(this.commnunityMain.data.punto_recompensaVOLUMENRED);
        this.levelCommunityMain = response.data.level;
        const dataLevelProgressBar = this.levelsProgressBar.find( level => level.level === parseInt(this.levelCommunityMain.punto_recompensa_nivelTITULO));
        if(dataLevelProgressBar) {
          this.valueProgressBar = this.getValueProgressBar(parseFloat(this.commnunityMain.data.punto_recompensaVOLUMEN), dataLevelProgressBar.maxRP);
          this.levelMinPay = dataLevelProgressBar.RP;
          this.valuePercProgressBar = this.getValueProgressBar(this.levelMinPay, dataLevelProgressBar.maxRP);
        }
        this.singNextLevel = parseFloat(this.levelCommunityMain.punto_recompensa_nivelVOLUMENMAX) - this.CRP;
        const progressBar = document.getElementById("progress-bar-pr");
        this.widthProgressBar = progressBar.clientWidth;
        this.positionBrand = this.getPostionBrand(this.valuePercProgressBar, progressBar.clientWidth);
        this.getInfoListMyLevel();
        this.getListPeriod();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  getInfoListMyLevel() {
    this.servicesCommunity.getInfoListMyLevel().subscribe(
      (response) => {
        this.listMyLevel = response.data.levels;
        setTimeout(() => {
          this.getScroll(parseInt(this.levelCommunityMain.punto_recompensa_nivelTITULO));
        }, 150);
        this.cargandoService.terminaCargando();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  getListPeriod() {
    this.servicesCommunity.getInfoLisPeriod().subscribe(
      (response) => {
        this.listPeriod = response.data;
        this.cargandoService.terminaCargando();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  getInfoListByPeriod() {
    this.cargandoService.iniciaCargando();
    const month =  (this.nroMonth.toString().padStart(2, '0'));
    const dataPeriod = this.listPeriod.find( per => per.month === month);
    let idPeriod = 0;
    if (dataPeriod) {
      idPeriod = dataPeriod.id;
      this.servicesCommunity.getInfoListByPeriod(idPeriod).subscribe(
        (response) => {
          this.commnunityMain.data.punto_recompensaGANANCIA = response.data.punto_recompensaGANANCIA;
          this.commnunityMain.data.punto_recompensaVOLUMEN = response.data.punto_recompensaVOLUMEN;
          this.CRP = parseFloat(response.data.punto_recompensaVOLUMEN) +  parseFloat(response.data.punto_recompensaVOLUMENRED);
          this.commnunityMain.data.network_son_count = response.data.network_son_count;
          this.commnunityMain.data.network_father_count = response.data.network_father_count;
          this.levelCommunityMain.id = response.data.punto_recompensa_nivelID;
          const dataLevel = this.listMyLevel.find( level => level.id === this.levelCommunityMain.id);
          if (dataLevel) {
            this.singNextLevel = parseFloat(dataLevel.punto_recompensa_nivelVOLUMENMAX) - this.CRP;
          } else {
            this.singNextLevel = 0;
          }
          console.log(this.commnunityMain)
          this.cargandoService.terminaCargando();
        },
        () => this.cargandoService.terminaCargando()
      );
    }
  }

  showModal(typeModal: string) {
    this.setTypeModalInfo.emit(typeModal);
    this.setModalInfo.emit(true);
  }

  getValueProgressBar (value: number, valueMax: number) {
    let x = ((100 * value) / valueMax) / 100;
    return x;
  }

  getPostionBrand(value: number, width: number) {
    let x = (width * value);
    return x;
  }

}
