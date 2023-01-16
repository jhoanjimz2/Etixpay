import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MapaService } from '../../../../services/mapa.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CargandoService } from '../../../../services/cargando.service';
import { CamaraService } from 'src/app/services/camara.service';
import {Plugins, CameraResultType } from'@capacitor/core';
const {Camera} = Plugins;

@Component({
  selector: 'app-sugerencia-tienda',
  templateUrl: './sugerencia-tienda.component.html',
  styleUrls: ['./sugerencia-tienda.component.scss'],
})
export class SugerenciaTiendaComponent {

  proceso = 1;
  categorias = [];
  formulario: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [
      Validators.required
    ]),
    categoria: new FormControl('', [
      Validators.required
    ]),
    contacto: new FormControl('', [
    ]),
    email: new FormControl('', [
    ]),
    direccion: new FormControl('', [
      Validators.required
    ])
  });
  formulario_dos: FormGroup = this.formBuilder.group({
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(1)
    ])
  });

  coordenadas = {
    latitud: null,
    longitud: null
  }

  @Input() imagen = null;
  @Input() imagen_para_subir = null;
  
  token = JSON.parse(localStorage.getItem('user'));

  constructor(
    private modalController: ModalController,
    private mapaService: MapaService,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private cargandoService: CargandoService,
    private camaraService: CamaraService,
  ) { 
    this.cargar_categorias();
  }
  handleAddressChange(address: Address) {
    this.coordenadas.latitud = address.geometry.location.lat();
    this.coordenadas.longitud = address.geometry.location.lng();
    this.formulario.controls['direccion'].setValue(address.formatted_address);
  }
  salir_sin_argumentos() {
    this.modalController.dismiss();
  }
  nombre_categoria(categoria) {
    if (localStorage.getItem('lenguaje') == 'es') return categoria.categoria_empresaTITULOES
    if (localStorage.getItem('lenguaje') == 'it') return categoria.categoria_empresaTITULOIT
    if (localStorage.getItem('lenguaje') == 'ro') return categoria.categoria_empresaTITULORO
    if (localStorage.getItem('lenguaje') == 'en') return categoria.categoria_empresaTITULO
  }
  cargar_categorias() {
    this.mapaService.cargarCategorias().subscribe((data: any) => {
      this.categorias = data.data;
    }, error => {
    })
  }
  avanzar(tipo) {
    if (tipo == 4) return this.crear_sugerencia();
    this.proceso = tipo;
  }
  retroceder(tipo) {
    this.proceso = tipo;
  }
  async cargar_camara() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.imagen = camara.dataUrl;
    this.imagen_para_subir = this.camaraService.dataURItoBlob(this.imagen );
  }
  
  crear_sugerencia() {
    this.cargandoService.iniciaCargando();
    this.mapaService.crearSugerencia(
      this.formulario.controls.nombre.value,
      this.formulario.controls.categoria.value,
      this.formulario.controls.email.value,
      this.formulario.controls.contacto.value,
      this.formulario.controls.direccion.value,
      this.formulario_dos.controls.descripcion.value,
      this.coordenadas.latitud,
      this.coordenadas.longitud,
      this.imagen_para_subir
      ).subscribe( (data: any) => {
      this.proceso = 4;
      this.cargandoService.terminaCargando();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
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

