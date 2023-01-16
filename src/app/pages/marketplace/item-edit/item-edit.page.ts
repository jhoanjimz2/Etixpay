import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';

import { CargandoService } from 'src/app/services/cargando.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { ModalEditItemComplComponent } from './components/modal-edit-item-compl/modal-edit-item-compl.component';
import { ModalEditItemErrorComponent } from './components/modal-edit-item-error/modal-edit-item-error.component';
import { TranslateService } from '@ngx-translate/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-market-place-item-edit',
  templateUrl: './item-edit.page.html',
  styleUrls: ['./item-edit.page.scss'],
})
export class ItemEditPage implements OnInit {

  idProduct = '';
  
  product = {
    main_image: { file: { fileURL: ''}, uuid: '' },
    gallery: [  ],
    productNAME: '',
    country_id: '',
    city_id: '',
    productADDRESS: '',
    current_price: { priceVALUE: 0, uuid: '' },
    productDESCRIPTION: '',
    category_id: '',
    shipping_method_data: [],
    main_attributes: [],
    user_data: { uuid: '' }

  }

  
  mainImage = '';


  editProduct = {
    gallery: [],
    main_image: {},
    productNAME: '',
    price: {
      priceVALUE: 0,
      uuid: ''
    },
    product_type: '',
    productSKU: '',
    productSHORTDESCRIPTION: '',
    productDESCRIPTION: '',
    category_uuid: '',
    product_state_code: '',
    hasCommunityCommission: 0,
    countryName: '',
    cityName: '',
    productADDRESS: '',
    shipping_methods: [],
    attributes: [],
    user: { id: '' }
  };
  
  imageMain = {uuid: null, file_upload: null};
  imageMainHtml: string = '';
  imageEdit: any = [];
  imageTempEdit: string[] = [ '', '', '' ];

  fgAction = false;
 
  conmmunity = 10;
  netSales = 1300.00;
  file: File;

  paises: any = [];
  pais: any = [];
  page = 1; size = 15;

  ciudades = [];
  ciudad: any = []; 
  page_ciudad = 1; size_ciudad = 15;
  
  constructor(
    private modalController: ModalController,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService,
    private router: Router,
    public route: ActivatedRoute,
    private popoverController: PopoverController,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.idProduct = params.id;
      if (this.idProduct) {
        this.getProductDetail();
        this.cargarPaises();
      } else {
        this.router.navigate(["pages/my-items"]);
      }
    });
  }
  cargarPaises() {
    this.marketplaceService.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.get_paises(this.page, this.size);
    });
  }

  getProductDetail() {
    this.cargandoService.iniciaCargando();
    this.marketplaceService.getProductDetail(this.idProduct).subscribe( (response: any) => {
        console.log(response.data)
        this.product = response.data;
        this.mainImage = this.product.main_image.file.fileURL;
        this.rellenarDatos();
        this.cargandoService.terminaCargando();
      }, 
      () => {
        this.cargandoService.terminaCargando();
        this.router.navigate(["pages/marketplace"]);
      }
    );
  }

  async editItem(exito = true) {
    if (exito) {
      const modal = await this.modalController.create({
        component: ModalEditItemComplComponent,
        componentProps: {
          idProduct: this.idProduct
        }
      });
      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: ModalEditItemErrorComponent
      });
      return await modal.present();
    }
  }

  add_img(event, id) {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;
    let texto, texto2;
    this.translateService.get('THEFILEMUST').subscribe(value => { texto = value; });
    this.translateService.get('MAXIMO8MG2').subscribe(value => { texto2 = value; });
    if (mimeType.match(/image\/*/) == null) return this.Alert(texto, 'OK', true);
    if (event.target.files[0].size > 2000000) return this.Alert(texto2, 'OK', true);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.file = event.target.files[0];
      this.photo(this.file,reader.result, id)
      return;
    }
  }
  photo (photo: File, html, photoTipe) {
    switch (photoTipe) {
      case 'main':
        this.imageMain.uuid = this.product.main_image.uuid;
        this.imageMain.file_upload = photo;
        this.imageMainHtml = html;
        break;
      case 0:
        this.imageEdit[0].uuid = this.product.gallery[0].uuid;
        this.imageEdit[0].file_upload = photo;
        this.imageTempEdit[0] = html;
        break;
      case 1:
        this.imageEdit[1].uuid = this.product.gallery[1].uuid;
        this.imageEdit[1].file_upload = photo;
        this.imageTempEdit[1] = html;
        break;
      case 2:
        this.imageEdit[2].uuid = this.product.gallery[2].uuid;
        this.imageEdit[2].file_upload = photo;
        this.imageTempEdit[2] = html;
        break;
    }
  }


  rellenarDatos() {
    this.editProduct.gallery = this.imageEdit;
    this.editProduct.main_image = this.imageMain;
    this.editProduct.productNAME = this.product.productNAME;
    this.editProduct.price.priceVALUE = this.product.current_price.priceVALUE;
    this.editProduct.price.uuid = this.product.current_price.uuid;
    this.editProduct.product_type = 'product';
    this.editProduct.productSKU = this.product.productNAME;
    this.editProduct.productSHORTDESCRIPTION = this.product.productNAME;
    this.editProduct.productDESCRIPTION = this.product.productDESCRIPTION;
    this.editProduct.category_uuid = this.product.category_id;
    this.editProduct.product_state_code = 'activo';
    this.editProduct.hasCommunityCommission = 0;
    this.editProduct.countryName = this.product.country_id;
    this.editProduct.cityName = this.product.city_id;
    this.editProduct.productADDRESS = this.product.productADDRESS;
    this.editProduct.shipping_methods[0] = this.product.shipping_method_data[0];
    this.editProduct.user.id = this.product.user_data.uuid;
    this.editProduct.attributes = this.rellenarAtributos;

  }
  get rellenarAtributos() {
    let i = 0; let arreglo = [];
    this.product.main_attributes[0].mainattributes.forEach(element => {
      let data = { 
        main_attribute_code: element.main_attribute_code,
        uuid:  element.uuid,
        value: element.product_attributes[0].main_product_attributeVALUE
      } 
      arreglo.push(data);
      i++;
    });
    return arreglo;
  }

  editProduc() {
    this.rellenarDatos();
    this.marketplaceService.editProd(this.idProduct,this.editProduct).subscribe( (response: any) => {
      this.editItem();
    }, error => {
      this.editItem(false);
    })
  }










  cargar_ciudades(event) {
    this.product.city_id = null;
    this.page_ciudad = 1; this.size_ciudad = 15;
    this.marketplaceService.ciudades(event.value.id).subscribe( (data: any) => {
      this.ciudades = data.data;
      this.get_ciudades_dos(this.page_ciudad, this.size_ciudad);
    }, error => {
      console.log(error)
    });
  }
  get_ciudades(page?: number, size?: number) {
    if (page && size) {
      this.ciudad = this.ciudad.concat(this.ciudades.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page_ciudad++;
    return this.ciudad;
  }
  get_ciudades_dos(page?: number, size?: number) {
    if (page && size) {
      this.ciudad = this.ciudades.slice((page - 1) * size, ((page - 1) * size) + size);
    }
    this.page_ciudad++;
    return this.ciudad;
  }
  obtener_ciudades(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    if (this.page_ciudad > this.ciudades.length / this.size_ciudad) {
      event.component.disableInfiniteScroll();
      return;
    }
    setTimeout(() => {
      let paisesArray = this.get_ciudades(this.page_ciudad, this.size_ciudad);
      paisesArray = event.component.items.concat(paisesArray);
      event.component.items = paisesArray;
      event.component.endInfiniteScroll();
    }, 500);
  }
  buscar_ciudad(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text) {
      event.component.items = this.get_ciudades(this.page_ciudad, this.size_ciudad);
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }
    setTimeout(() => {
      event.component.items = this.filter_ports_ciudad(text);
      event.component.endSearch();
    }, 500);
  }
  filter_ports_ciudad(text: string) {
    return this.ciudades.filter(ciudad => {
      return ciudad.ciudadNOMBRE.toLowerCase().indexOf(text) !== -1;
    });
  }



  //-------------------------------------------------------------------------SIGN UP PAISES-----------------------------------------------------//
  get_paises(page?: number, size?: number) {
    if (page && size) {
      this.pais = this.pais.concat(this.paises.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page++;
    return this.pais;
  }
  close() {
    this.page = 1;
    this.size = 15;
    this.get_paises(this.page, this.size);
  }
  obtenerPaises(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    if (this.page > this.paises.length / this.size) {
      event.component.disableInfiniteScroll();
      return;
    }
    setTimeout(() => {
      let paisesArray = this.get_paises(this.page, this.size);
      paisesArray = event.component.items.concat(paisesArray);
      event.component.items = paisesArray;
      event.component.endInfiniteScroll();
    }, 500);
  }

  buscarPais(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text) {
      event.component.items = this.get_paises(this.page, this.size);
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }

    setTimeout(() => {
      event.component.items = this.filterPorts(text);
      event.component.endSearch();
    }, 500);
  }

  filterPorts(text: string) {
    return this.paises.filter(pais => {
      return pais.paisNOMBRE.toLowerCase().indexOf(text) !== -1;
    });
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
