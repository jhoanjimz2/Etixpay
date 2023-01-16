import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NegoziService } from 'src/app/services/negozi.service';
import { CargandoService } from 'src/app/services/cargando.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-voucher',
  templateUrl: './register-voucher.component.html',
  styleUrls: ['./register-voucher.component.scss'],
})
export class RegisterVoucherComponent {
  @Input() uuid;
  fileDestacada: File;
  imgDestacada = null;
  imgDestacadaHtml = null;
  imgSecundaria = null;
  imgSecundariaHtml = null;
  fileSecundaria: File;
  cateVouchers = [];

  formulario: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    fechaInicial: new FormControl('', [Validators.required]),
    fechaFinal: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    limiteDeCompra: new FormControl('', [Validators.required]),
    checkUno: new FormControl(false, [Validators.required,Validators.requiredTrue]),
    checkDos: new FormControl(false, [Validators.required,Validators.requiredTrue]),
  });

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private negoziService: NegoziService,
    private cargandoService: CargandoService
  ) { 
    this.cargarCateVoucher();
  }
  cargarCateVoucher() {
    this.negoziService.cargarCategoriasVouchersTienda().subscribe((data: any) => {
      this.cateVouchers = data.data;
    }, error => {
      console.log(error);
    })
  }
  terminosCondiciones() {
    window.open(environment.TyC);
  }
  politicasSeguridad() {
    window.open(environment.PdP);
  }
  addImgDestacada(event) {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;
    let texto;
    this.translateService.get('THEFILEMUST3').subscribe(value => { texto = value; });
    if (mimeType.match(/image\/*/) == null) return this.Alert(texto, 'OK', true);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.fileDestacada = event.target.files[0];
      this.imgDestacada = this.fileDestacada;
      this.imgDestacadaHtml = reader.result;
    }
  }
  addImgSecundaria(event) {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;
    let texto;
    this.translateService.get('THEFILEMUST3').subscribe(value => { texto = value; });
    if (mimeType.match(/image\/*/) == null) return this.Alert(texto, 'OK', true);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.fileSecundaria = event.target.files[0];
      this.imgSecundaria = this.fileSecundaria;
      this.imgSecundariaHtml = reader.result;
    }
  }
  crearVoucher() {
    this.cargandoService.iniciaCargando();
    this.negoziService.crearVoucherTienda(
      this.uuid,
      this.formulario.controls.precio.value,
      moment(this.formulario.controls.fechaFinal.value).format('YYYY-MM-DD HH:mm:ss'),
      this.formulario.controls.limiteDeCompra.value,
      this.formulario.controls.descripcion.value,
      this.formulario.controls.name.value,
      10,
      this.imgDestacada,
      this.imgSecundaria,
      moment(this.formulario.controls.fechaInicial.value).format('YYYY-MM-DD HH:mm:ss'),
      this.formulario.controls.tipo.value,
      ).subscribe((data: any) => {
        this.cargandoService.terminaCargando();
        this.modalController.dismiss({data: true});
        this.Alert(data.message, 'OK', false);
      }, error => {
        this.cargandoService.terminaCargando();
        this.Alert(error.message, 'OK', true);
        this.formulario.reset();
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

