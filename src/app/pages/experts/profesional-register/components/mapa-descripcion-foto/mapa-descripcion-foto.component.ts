import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plugins, CameraResultType } from'@capacitor/core';
import { DataMapa } from 'src/app/models/register-expert/dataMapa.model';
import { ProfesionalID } from 'src/app/models/register-expert/profesionalID.model';
import { CamaraService } from 'src/app/services/camara.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../../services/cargando.service';
import { ExpertsService } from '../../../../../services/experts.service';
import { PopoverController } from '@ionic/angular';
const  { Camera } = Plugins;


@Component({
  selector: 'app-mapa-descripcion-foto',
  templateUrl: './mapa-descripcion-foto.component.html',
  styleUrls: ['./mapa-descripcion-foto.component.scss'],
})
export class MapaDescripcionFotoComponent implements OnInit {
  
  @Output()funcion :EventEmitter<any> = new EventEmitter();
  @Input() profesionalID: ProfesionalID = new ProfesionalID();
  @Input() dataMapa: DataMapa = new DataMapa();
  @Input() final;

  @Input() galeriaHTML = {
    imgPrincipal: '',
    imgSecundaria: '',
    imgTerciaria: '',
    galeria: ['','','','','']
  }

  constructor(
    private camaraService: CamaraService,
    private cargandoService: CargandoService,
    private expertsService: ExpertsService,
    private popoverController: PopoverController
    ) { }

  ngOnInit() {}


  async photo(opcion) {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const base64Image = camara.dataUrl;
    const file: any = this.camaraService.dataURItoBlob(base64Image);
    switch (opcion) {
      case 1:
        this.galeriaHTML.imgPrincipal = base64Image;
        this.dataMapa.mainImage = file;
        break;
      case 2:
        this.galeriaHTML.imgSecundaria = base64Image;
        this.dataMapa.squareImage = file;
        break;
      case 3:
        this.galeriaHTML.imgTerciaria = base64Image;
        this.dataMapa.rectangularImage = file;
        break;
      case 4:
        this.galeriaHTML.galeria[0] = base64Image;
        this.dataMapa.gallery[0] = file;
        break;
      case 5:
        this.galeriaHTML.galeria[1] = base64Image;
        this.dataMapa.gallery[1] = file;
        break;
      case 6:
        this.galeriaHTML.galeria[2] = base64Image;
        this.dataMapa.gallery[2] = file;
        break;
      case 7:
        this.galeriaHTML.galeria[3] = base64Image;
        this.dataMapa.gallery[3] = file;
        break;
      case 8:
        this.galeriaHTML.galeria[4] = base64Image;
        this.dataMapa.gallery[4] = file;
        break;
    }
  }


  continue() {
    this.cargandoService.iniciaCargando();
    let data = {
      'main-image': this.dataMapa.mainImage,
      'rectangular-image': this.dataMapa.rectangularImage,
      'square-image': this.dataMapa.squareImage,
      'gallery': this.dataMapa.gallery,
      'profesionalNAMEMAP': this.dataMapa.profesionalNAMEMAP,
      'profesionalDESRIPTION': this.dataMapa.profesionalDESRIPTION
    }
    this.expertsService.preRegisterImages(data, this.profesionalID.profesionalID).subscribe((data:any) => {
      this.cargandoService.terminaCargando();
      this.funcion.emit({opcion: 5});
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  volverAlFinal() {
    this.cargandoService.iniciaCargando();
    let data = {
      'main-image': this.dataMapa.mainImage,
      'rectangular-image': this.dataMapa.rectangularImage,
      'square-image': this.dataMapa.squareImage,
      'gallery': this.dataMapa.gallery,
      'profesionalNAMEMAP': this.dataMapa.profesionalNAMEMAP,
      'profesionalDESRIPTION': this.dataMapa.profesionalDESRIPTION
    }
    this.expertsService.preRegisterImages(data, this.profesionalID.profesionalID).subscribe((data:any) => {
      this.cargandoService.terminaCargando();
      this.final.final = false;
      this.funcion.emit({opcion: 5});
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
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
