import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MetodosPagoService } from 'src/app/services/metodos-pago.service';

@Component({
  selector: 'app-metodos-de-pago-cuatro',
  templateUrl: './metodos-de-pago-cuatro.component.html',
  styleUrls: ['./metodos-de-pago-cuatro.component.scss'],
})
export class MetodosDePagoCuatroComponent implements OnInit {
  @Input() prev_select: any = [{}];
  tarjetas: any = [
    {texto: 'ACCOUNT', nombre: localStorage.getItem('wallet'), icon: 'wallet-outline', seleccionado: false, tipo: 'ATM'},
    {texto: 'Etixcash', nombre: 'Etixcash', img: '/assets/tabs/componentes/tix.png', seleccionado: false, tipo: 'TIX'}
  ];
  texto;
  constructor(
    private metodos_pago_service: MetodosPagoService,
    private translate_service: TranslateService
    ) { }

  ngOnInit() {
    this.translate_service.get('PREPAID').subscribe(value => { this.texto = value; });
    this.cargar_tarjetas();
  }
  cargar_tarjetas() {
    this.metodos_pago_service.cargar_cuentas().subscribe((data: any) => {
      if(data.data) {
        let data_ = [].concat(this.tarjetas, data.data)
        this.tarjetas = data_;
      }
      this.renombrar_tc();
    }, error => {
    })
  }
  renombrar_tc() {
    this.tarjetas.forEach( data => {
      if (!data.tipo) {
        data['texto'] = this.texto + ' •••• ' + data.last4;
        data['nombre'] = data.brand;
        data['correo'] = data.name;
        data['img'] = this.img(data.brand);
        data['seleccionado'] = false;
        data['tipo'] = 'TC'
      }
    })
  }
  img (tipo) {
    if (tipo == 'Diners Club') return "/assets/tabs/componentes/diners.png"; 
    if (tipo == 'American Express') return "/assets/tabs/componentes/american.png"; 
    if (tipo == 'MasterCard') return "/assets/tabs/componentes/mastercard.png"; 
    if (tipo == 'Visa') return "/assets/tabs/componentes/visa.png"; 
  }
  select_cuenta (cuenta) {
    let prev = this.prev_select[0];
    prev.seleccionado = false; 
    this.prev_select[0] = cuenta; 
    this.prev_select[0].seleccionado = true;
  }

}
