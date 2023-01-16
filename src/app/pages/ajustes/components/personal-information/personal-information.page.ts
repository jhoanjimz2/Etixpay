import { Component } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CuentaService } from '../../../../services/cuenta.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../services/cargando.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage {

  infoPersonal = {
    imagen: '/assets/tabs/menu/componentes/cuenta-menu/icono_perfil.png',
    nombres: '',
    apellidos: '',
    telefono: '',
    iso: '',
    uuid: '',
    email: '',
    persona: {
      personaNOMBRES: '',
      personaAPELLIDOS: '',
      personaDIRECCION: '',
      personaFECHANACIMIENTO: '',
      personaTELEFONO: '',
      pais_domicilio: {
        id: 0
      },
      ciudad_domicilio: {}
    }
  };

  editarFormulario = false;
  paises;
  pais: any = []; page = 1; size = 15;
  ciudades;
  ciudad: any = []; page_ciudad = 1; size_ciudad = 15;

  formulario: FormGroup = this.formBuilder.group({
    nombres: new FormControl({value: '', disabled: true }, [Validators.required]),
    apellidos: new FormControl({value: '', disabled: true }, [Validators.required]),
    fecha_nacimiento: new FormControl({value: '', disabled: true }, [Validators.required]),
    direccion: new FormControl({value: '', disabled: true }, [Validators.required]),
    pais: new FormControl({value: '', disabled: true }, [Validators.required]),
    ciudad: new FormControl({value: '', disabled: true }, [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private cuentaService: CuentaService,
    private popoverController: PopoverController,
    private cargandoService: CargandoService,
    private navCtrl: NavController,
    public route: ActivatedRoute
  ) { 
    this.cargarPaises();
    this.cargarCiudades();
    this.route.queryParams.subscribe( params => {
      this.infoPersonal = JSON.parse(params.order); 
      this.cargarFormulario();
    })
  }
  back() {
    this.navCtrl.back();
  }
  cargarFormulario() {
    this.formulario.controls['nombres'].setValue(this.infoPersonal.persona.personaNOMBRES);
    this.formulario.controls['apellidos'].setValue(this.infoPersonal.persona.personaAPELLIDOS);
    this.formulario.controls['fecha_nacimiento'].setValue(this.infoPersonal.persona.personaFECHANACIMIENTO);
    this.formulario.controls['direccion'].setValue(this.infoPersonal.persona.personaDIRECCION);
    this.formulario.controls['pais'].setValue(this.infoPersonal.persona.pais_domicilio);
    this.formulario.controls['ciudad'].setValue(this.infoPersonal.persona.ciudad_domicilio);
  }
  cargarPaises() {
    this.cuentaService.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.get_paises(this.page, this.size);
    });
  }
  get fecha_limite() {
    return moment(new Date()).format('YYYY-MM-DD')
  }
  cargarCiudades() {
    if (!this.infoPersonal.persona.pais_domicilio) return;
    this.cuentaService.ciudades(this.infoPersonal.persona.pais_domicilio.id).subscribe( (data: any) => {
      this.ciudades = data.data;
      this.get_ciudades(this.page_ciudad, this.size_ciudad);
    }, error => {
      console.log(error)
    });
  }
  cargar_ciudades_dos(event) {
    this.page_ciudad = 1; this.size_ciudad = 15;
    this.cuentaService.ciudades(event.value.id).subscribe( (data: any) => {
      this.ciudades = data.data;
      this.get_ciudades_dos(this.page_ciudad, this.size_ciudad);
    }, error => {
      console.log(error)
    });
  }
  editar() {
    this.editarFormulario = !this.editarFormulario;
    this.formulario.enable();
  }
  cancelar() {
    this.editarFormulario = !this.editarFormulario;
    this.formulario.controls['nombres'].setValue(this.infoPersonal.persona.personaNOMBRES);
    this.formulario.controls['apellidos'].setValue(this.infoPersonal.persona.personaAPELLIDOS);
    this.formulario.controls['fecha_nacimiento'].setValue(this.infoPersonal.persona.personaFECHANACIMIENTO);
    this.formulario.controls['direccion'].setValue(this.infoPersonal.persona.personaDIRECCION);
    this.formulario.controls['pais'].setValue(this.infoPersonal.persona.pais_domicilio);
    this.formulario.controls['ciudad'].setValue(this.infoPersonal.persona.ciudad_domicilio);
    this.formulario.disable();
  }
  actualizar_informacion() {
    this.cargandoService.iniciaCargando();
    this.cuentaService.editar_perfil(
      this.formulario.controls.nombres.value,
      this.formulario.controls.apellidos.value,
      null,
      moment(this.formulario.controls.fecha_nacimiento.value).format('YYYY-MM-DD'),
      this.formulario.controls.pais.value.id,
      this.formulario.controls.ciudad.value.id,
      this.formulario.controls.direccion.value,
      ).subscribe((data: any) => {
        this.cargandoService.terminaCargando();
        this.navCtrl.back();
        this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  get_paises(page?: number, size?: number) {
    if (page && size) {
      this.pais = this.pais.concat(this.paises.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page++;
    return this.pais;
  }
  obtener_paises(event: {
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
  buscar_pais(event: {
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
      event.component.items = this.filter_ports(text);
      event.component.endSearch();
    }, 500);
  }
  filter_ports(text: string) {
    return this.paises.filter(pais => {
      return pais.paisNOMBRE.toLowerCase().indexOf(text) !== -1;
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
  async Alert(tex, bot, value) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: value
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
