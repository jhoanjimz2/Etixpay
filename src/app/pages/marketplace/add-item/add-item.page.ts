import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { ProductMarketPlace } from 'src/app/models/marketplace/product.model';
import { CategoriesMarkeplace } from 'src/app/models/marketplace/responseCategories.model';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { RequetsRegProduct } from 'src/app/models/marketplace/requetsRegProduct.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { ModalAddItemComplComponent } from './components/modal-add-item-compl/modal-add-item-compl.component';
import { ModalAddItemErrorComponent } from './components/modal-add-item-error/modal-add-item-error.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage {

  product: ProductMarketPlace = new ProductMarketPlace();
  categories: CategoriesMarkeplace[] = [];
  fgAction = false;
  requetsProduct: RequetsRegProduct = new RequetsRegProduct();
  file: File;
  metodShopping: any = [];

  paises: any = [];
  pais: any = [];
  page = 1; size = 15;

  ciudades = [];
  ciudad: any = []; 
  page_ciudad = 1; size_ciudad = 15;

  
  constructor(
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private translateService: TranslateService
  ) { 
    this.cargarPaises();
    this.getCategories();
    this.cargarMetod();
  }
  cargarPaises() {
    this.marketplaceService.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.get_paises(this.page, this.size);
    });
  }
  cargarMetod() {
    this.marketplaceService.getMetodShopping().subscribe((data: any) => {
      this.metodShopping = data.data;
    });
  }
  getCategories() {
    this.marketplaceService.getCategories().subscribe(
      (response: any) => {
        this.categories = response.data
      }
    );
  }
  handleAddressChange(address: Address) {
    this.product.address = address.formatted_address;
  }

  optionDelivery(nro: number) {
    this.requetsProduct.shipping_methods[0].price.priceVALUE = 0;
    this.product.priceShipping = 0;
    if (nro === 1 && this.product.directWithdraw) {
      this.product.shipping = false;
    }

    if (nro === 2 && this.product.shipping) {
      this.product.directWithdraw = false;
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

  photo (photo: File, html, photoNumber: number) {
    switch (photoNumber) {
      case 1:
        this.product.image1 = photo;
        this.product.imageStr1 = html;
        break;
      case 2:
        this.product.image2 = photo;
        this.product.imageStr2 = html;
        break;
      case 3:
        this.product.image3 = photo;
        this.product.imageStr3 = html;
        break;
      case 4:
        this.product.image4 = photo;
        this.product.imageStr4 = html;
        break;
    }
  }

  commisions(event) {
    if (event.detail.checked) { 
      this.product.community = 10;
      this.requetsProduct.hasCommunityCommission = 1;
    } else { 
      this.product.community = 3;
      this.requetsProduct.hasCommunityCommission = 0;
    }
  }

  saveProduct() {
    this.requetsProduct.productNAME = this.product.title;
    this.requetsProduct.productSHORTDESCRIPTION = this.product.title;
    this.requetsProduct.productSKU = this.product.title;
    this.requetsProduct.productDESCRIPTION = this.product.description;
    this.requetsProduct.product_type = 'product';
    this.requetsProduct.category_uuid = this.product.category;
    this.requetsProduct.price.priceVALUE = this.product.price;
    this.requetsProduct.product_state_code = 'activo';
    this.requetsProduct.country_id = this.product.country.id;
    this.requetsProduct.city_id = this.product.city.id;
    this.requetsProduct.productADDRESS = this.product.address;
    let shippingMetod = '';
    if (this.product.directWithdraw) shippingMetod = this.metodShopping[1].uuid;
    if (this.product.shipping) shippingMetod = this.metodShopping[0].uuid;
    this.requetsProduct.shipping_methods[0].shipping_method_uuid = shippingMetod;
    this.requetsProduct.shipping_methods[0].price.priceVALUE = this.product.priceShipping;
    this.requetsProduct.attributes[0].value = this.product.height;
    this.requetsProduct.attributes[1].value = this.product.width;
    this.requetsProduct.attributes[2].value = this.product.depth;
    this.requetsProduct.attributes[3].value = this.product.weight;
    this.requetsProduct.main_image.file_upload = this.product.image1;
    this.requetsProduct.gallery[0].file_upload = this.product.image2;
    this.requetsProduct.gallery[1].file_upload = this.product.image3;
    this.requetsProduct.gallery[2].file_upload = this.product.image4;
 
    this.cargandoService.iniciaCargando();
    this.marketplaceService.saveProduct(this.requetsProduct).subscribe( (response: any) => {
      this.cargandoService.terminaCargando();
      if (response.errors) return this.modalFalse();
      this.modalTrue();
    },error => {
      this.cargandoService.terminaCargando();
      this.modalFalse();
    });
  }
  async modalTrue() {
    const modal = await this.modalController.create({
      component: ModalAddItemComplComponent
    });
    return await modal.present();
  }
  async modalFalse() {
    const modal = await this.modalController.create({
      component: ModalAddItemErrorComponent
    });
    modal.componentProps = { dataProduct: this.requetsProduct };
    return await modal.present();
  }


  cargar_ciudades(event) {
    this.product.city = null;
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
