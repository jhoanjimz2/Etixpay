import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PagarService } from '../../../../../services/pagar.service';
import { CargandoService } from '../../../../../services/cargando.service';

@Component({
  selector: 'app-enviando',
  templateUrl: './enviando.component.html',
  styleUrls: ['./enviando.component.scss'],
})
export class EnviandoComponent {

  @Output() funcion: EventEmitter<any> = new EventEmitter();
  @Input() cantidad = 0;
  @Input() informacion: any = {};
  wallet: string = localStorage.getItem('wallet');

  constructor(
    private pagarService: PagarService,
    private cargandoService: CargandoService
  ) { }

  paga() {
    this.cargandoService.iniciaCargando();
    this.pagarService.pagar('ATM', this.wallet, this.cantidad, this.informacion.email).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      if (data.data.success) {
        this.funcion.emit({cantidad: this.cantidad, opcion: 3});
      } else {
        this.funcion.emit({cantidad: this.cantidad, opcion: 4});
      }
    })
  }

  get pr () {
    return( this.informacion.reward_ponit / 100) * this.cantidad;
  }
  
}
