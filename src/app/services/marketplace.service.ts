import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { RequetsRegProduct } from '../models/marketplace/requetsRegProduct.model';


@Injectable({
  providedIn: 'root'
})
export class MarketplaceService extends ConexionService {

  constructor(private http: HttpClient) {
    super(http);
  }

  paises() {
    return this.consultaGET('paises/habilitados');
  }
  ciudades(id_pais) {
    return this.consultaGET('paises/' + id_pais + '/ciudades');
  }
  loginMarketplace() {
    return this.consultaGetMarketPlace('auth/login-token');
  }
  getCategories() {
    return this.getCategoriesMP('etix-market/settings/categories/protected');
  }

  saveProduct(data: RequetsRegProduct) {
    return this.saveProductMP('etix-market/products/admin', data);
  }
  getProductsShop() {
    return this.getProductsShopMP('etix-market/products/admin');
  }
  getProductDetail(id: string) {
    return this.getProductDetailMP('etix-market/products/admin', id);
  }
  getMyProductsShop() {
    return this.getMyProductsShopMP('etix-market/products/admin');
  }
  editProd(uuid:string, data) {
    return this.editProduct('etix-market/products/admin/'+uuid, data);
  }
  deleteProductDetail(uuid: string) {
    return this.deleteProduct('etix-market/products/admin/'+uuid);
  }
  getMetodShopping() {
    return this.getMetod('etix-market/settings/shipping-methods/protected');
  }
  saveOrder(order_state_code, products) {
    let data = { order_state_code, products }
    return this.saveOrderMP('etix-market/orders/protected', data);
  }
  cargarSaldoTixPersonas() {
    return this.consultaGETAUTENTICADA('apps/cliente/dashboard');
  }
  cargarSaldoTixEmpresas() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }


}
