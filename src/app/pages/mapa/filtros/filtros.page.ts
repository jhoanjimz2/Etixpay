import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.page.html',
  styleUrls: ['./filtros.page.scss'],
})
export class FiltrosPage {
  categorias: any;
  categorias_seleccionadas: any;
  types_seleccionados: any;
  types: any = [];
  categorias_seleccionadas_prev: any = [];

  constructor(
    public route: ActivatedRoute,
    private navCtrl: NavController
  ) { 
    this.cargarParametros();
  }
  cargarParametros() {
    this.route.queryParams.subscribe( (params: any) => {
      this.categorias = JSON.parse(params.data).categorias;
      this.categorias_seleccionadas = JSON.parse(params.data).categorias_seleccionadas;
      this.types_seleccionados = JSON.parse(params.data).types_seleccionados;
      this.rellenar_filtros();
    })
  }
  rellenar_filtros() {
    this.categorias_seleccionadas.forEach(element => {
      this.categorias_seleccionadas_prev.push(element)
    });
    this.types_seleccionados.forEach(element => {
      this.types.push(element)
    });
  }
  salir_con_seleccion() {
    this.navCtrl.back(

      /* { 
        data: true, 
        categorias: this.categorias_seleccionadas_prev,
        types: this.types
      } */
    )
  }
  lenguaje(cat) {
    if (localStorage.getItem('lenguaje') == 'it') return cat.categoria_empresaTITULOIT
    if (localStorage.getItem('lenguaje') == 'en') return cat.categoria_empresaTITULO
    if (localStorage.getItem('lenguaje') == 'es') return cat.categoria_empresaTITULOES
    if (localStorage.getItem('lenguaje') == 'ro') return cat.categoria_empresaTITULORO
  }
  seleccionar(id) {
    let valid = this.types.find(id_ => id_ == 'companies'); if (!valid) return;
    let value = this.categorias_seleccionadas_prev.find(id_ => id_ == id);
    if (!value) return this.categorias_seleccionadas_prev.push(id);
    this.categorias_seleccionadas_prev.splice(this.buscar_categoria(id), 1);
  }
  buscar_categoria(id) {
    return this.categorias_seleccionadas_prev.indexOf(id)
  }
  verificar_seleccion(id) {
    let value = this.categorias_seleccionadas_prev.find(id_ => id_ == id);
    if (value) return true;
    return false
  }
  all_categorias() {
    this.categorias_seleccionadas_prev = [];        
  }

  
  seleccionar_type(id) {
    let value = this.types.find(id_ => id_ == id);
    if (value && id == 'companies') this.all_categorias();
    if (!value) return this.types.push(id);
    this.types.splice(this.buscar_type(id), 1);
  }
  buscar_type(id) {
    return this.types.indexOf(id)
  }
  verificar_seleccion_type(id) {
    let value = this.types.find(id_ => id_ == id);
    if (value) return true;
    return false
  }


}
