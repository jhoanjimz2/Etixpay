import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    tema: '#01abe1'
  }

  constructor( 
    private statusBar: StatusBar,
    @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  // Metodo para guardar tema en el localStorage
  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    //console.log('Ajustes iniciales guardados');
  }

  // Metodo para carga el tema guadrado en el localStorage
  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema( this.ajustes.tema);
      //console.log('Ajustes Iniciales Caragados');
    } else {
      this.aplicarTema( this.ajustes.tema);
      //console.log('Ajustes Iniciales por Defectos Caragados');
    }
  }

  // Metodo para aplicar el tema guardado en el localStorage
  aplicarTema( tema: string) {
    const url = tema;
    this._document.getElementById('tema').setAttribute('content', url);
    this.statusBar.backgroundColorByHexString(url);

    this.ajustes.tema = tema;

    this.guardarAjustes();
  }
  default() {
    const url = '#01abe1';
    this._document.getElementById('tema').setAttribute('content', url);
    this.statusBar.backgroundColorByHexString(url);

    this.ajustes.tema = url;

    this.guardarAjustes();
  }

}

interface Ajustes {
  tema: string;
}

