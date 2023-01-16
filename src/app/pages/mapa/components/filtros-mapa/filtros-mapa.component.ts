import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filtros-mapa',
  templateUrl: './filtros-mapa.component.html',
  styleUrls: ['./filtros-mapa.component.scss'],
})
export class FiltrosMapaComponent implements OnInit {
  @Input() categorias: any;
  @Input() categorias_seleccionadas: any;
  @Input() types_seleccionados: any;
  types: any = [];
  categorias_seleccionadas_prev: any = [];

  constructor(
    private modal_controller: ModalController
  ) { }

  ngOnInit() {
    this.rellenar_filtros();
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
    this.modal_controller.dismiss({ 
      data: true, 
      categorias: this.categorias_seleccionadas_prev,
      types: this.types
    });
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
