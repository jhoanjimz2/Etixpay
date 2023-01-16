import { Component } from '@angular/core';
import { NavController, PopoverController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NegoziService } from '../../../services/negozi.service';
import { TiendaInfo } from './interface/tienda-info.model';
import { TiendaImagenes } from './interface/tienda-imagenes.model';
import { VerImgComponent } from './components/ver-img/ver-img.component';
import { CargandoService } from '../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesMarkeplace } from 'src/app/models/marketplace/responseCategories.model';
import { Product } from 'src/app/models/marketplace/reponseProducts.model';
import { CamaraService } from 'src/app/services/camara.service';
import { Plugins, CameraResultType } from'@capacitor/core';
const  { Camera, Geolocation } = Plugins;

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.page.html',
  styleUrls: ['./store-page.page.scss'],
})
export class StorePagePage {

  uuid = this.activeRoute.snapshot.paramMap.get('uuid');
  tiendaInfo: TiendaInfo = new TiendaInfo();
  tiendaImagenes: TiendaImagenes = new TiendaImagenes();
  imagenData;
  coments: any = [];
  horarios: any = [];
  ponderado = 0;
  vouchers: any = [];
  events : any = [];
  descripcion: string = "";
  telefonoAlternativo: string = "";
  informacionLocal: any = {};
  toggle = false;
  editar = false;
  localEmail = JSON.parse(localStorage.getItem('user')).username;

  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  categories: CategoriesMarkeplace[];
  products: Product[];

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private negoziService: NegoziService,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private cargandoService: CargandoService,
    private translate: TranslateService,
    private camaraService: CamaraService
  ) {
    this.cargarTienda();
    this.cargarComents();
    this.cargarGalery();
    this.cargarEvents();
    this.cargarVouchers();
    this.cargarDescripcion();
    this.cargarAlternativo();
    this.cargarInformation();
    this.cargarHorarios();
    this.cargarCategorias();
  }
  back() {
    this.navCtrl.back();
  }
  cargarCategorias() {
    this.negoziService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
      }
    );
  }
  cargarProductos(uuid) {
    this.negoziService.getProductsShop(uuid).subscribe(response => {
      this.products = response.data.data;
    });
  }

  cargarAlternativo(bandera = false) {
    this.negoziService.cargarAlternativo(this.uuid).subscribe((data: any) => {
      if (bandera) this.cargandoService.terminaCargando();
      this.telefonoAlternativo = data.data.empresaTELEFONOSECUANDARIO;
    }, error => {
      if (bandera) this.cargandoService.terminaCargando();
    });
  }
  cargarInformation(bandera = false) {
    this.negoziService.cargarInfo(this.uuid).subscribe((data: any) => {
      if (bandera) this.cargandoService.terminaCargando();
      this.informacionLocal = data.data;
    }, error => {
      if (bandera) this.cargandoService.terminaCargando();
    });
  }
  cargarDescripcion(bandera = false) {
    this.negoziService.cargarDescripcion(this.uuid).subscribe((data: any) => {
      if (bandera) this.cargandoService.terminaCargando();
      this.descripcion = data.data.empresaDESCRIPCION;
    }, error => {
      if (bandera) this.cargandoService.terminaCargando();
    });
  }
  cargarGalery(bandera = false) {
    this.negoziService.cargarGaleria(this.uuid).subscribe((data: any) => {
      if (bandera) this.cargandoService.terminaCargando();
      this.tiendaImagenes = data.data;
    }, error => {
      if (bandera) this.cargandoService.terminaCargando();
    });
  }
  cargarTienda() {
    this.negoziService.cargarTienda(this.uuid).subscribe((data: any) => {
      this.tiendaInfo = data.data;
      if (this.tiendaInfo.empresaEMAIL.toString().toLowerCase() == this.localEmail.toString().toLowerCase()) 
      this.toggle = true;
      //this.cargarProductos(this.tiendaInfo.user.main_uuid);
    });
  }
  cargarEvents() {
    this.negoziService.cargarEvents(this.uuid).subscribe((data: any) => {
      this.events = data.data;
    });
  }
  cargarVouchers() {
    this.negoziService.cargarVouches(this.uuid).subscribe((data: any) => {
      this.vouchers = data.data;
    });
  }
  cargarComents() {
    this.negoziService.cargarComentarios(this.uuid).subscribe((data: any) => {
      this.coments = data.data.comentarios;
      this.ponderado = data.data.empresa_comentarioPONDERADO;
    });
  }
  cargarHorarios(bandera = false) {
    this.negoziService.cargarHorarios(this.uuid).subscribe((data: any) => {
      if (bandera) this.cargandoService.terminaCargando();
      this.horarios = data.data;
    }, error => {
      if (bandera) this.cargandoService.terminaCargando();
    });
  }

  editarChange(event) {
    this.editar = event;
  }

  opcionesImg(img) {
    if (this.editar) this.Edit(img)
    else this.verImg(img)
  }


  llamarTelefonoPrincipal() {
    if (this.localEmail == this.tiendaInfo.empresaEMAIL) return;
    let url = 'tel:' + this.tiendaInfo.empresaTELEFONO;
    window.open(url)
  }
  llamarTelefonoAlternativo() {
    if (this.localEmail == this.tiendaInfo.empresaEMAIL) return;
    let url = 'tel:' + this.telefonoAlternativo;
    window.open(url);
  }

  async Edit(img) {
    let options, view, change, cancel;
    this.translate.get('OPTIONS').subscribe(value => { options = value; });
    this.translate.get('VIEWN').subscribe(value => { view = value; });
    this.translate.get('CHANGE').subscribe(value => { change = value; });
    this.translate.get('CANCELN').subscribe(value => { cancel = value; });
    const actionSheet = await this.actionSheetController.create({
      header: options,
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [ {
        text: view,
        icon: 'eye-outline',
        handler: () => {
          this.verImg(img);
        }
      }, {
        text: change,
        icon: 'reload',
        handler: () => {
          this.subirImg();
        }
      },{
        text: cancel,
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }
  async verImg(img) {
    const popover = await this.popoverController.create({
      component: VerImgComponent,
      cssClass: 'popoverVerImg',
      componentProps: { img },
      translucent: true,
      backdropDismiss: true
    });
    return await popover.present();
  }
  async subirImg() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const imagen = camara.dataUrl;
    const imagen_para_subir = this.camaraService.dataURItoBlob(imagen );
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarImgPrincipal( this.uuid, imagen_para_subir).subscribe( (data: any) => {
      this.cargarGalery(true);
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  
  async sacarPosicion() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.googleMaps(this.geo.lat, this.geo.lng); 
  }
  googleMaps(lat, lng) {
    let url: string = `https://www.google.es/maps/dir/${lat},${lng}/${this.tiendaInfo.empresaLATITUD},${this.tiendaInfo.empresaLONGITUD}`;
    window.open(url);
  }
  openEmail() {
    if (this.localEmail == this.tiendaInfo.empresaEMAIL) return;
    open('mailto:'+this.tiendaInfo.empresaEMAIL, "_system");
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
