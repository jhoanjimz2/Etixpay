import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CarterasService } from "../../../../paginas-usuarios/cartera/carteras.service";

@Component({
  selector: "app-cantidad",
  templateUrl: "./cantidad.component.html",
  styleUrls: ["./cantidad.component.scss"],
})
export class CantidadComponent {
  @Output() funcion: EventEmitter<any> = new EventEmitter();

  cantidad = 0;
  bandera: boolean = false;
  saldo = 0;
  user = JSON.parse(localStorage.getItem("user")).tipoUsuario;
  valid: boolean = false;
  @Input() informacion: any = {};

  constructor(private carterasService: CarterasService) {
    this.actualizar();
  }
  actualizar() {
    if (this.user == 3) this.persona();
    else this.empresa();
  }
  persona() {
    this.carterasService.cargarSaldoTixPersonas().subscribe((data: any) => {
      this.saldo = data.data.wallets[0].walletSALDOATM;
    });
  }
  empresa() {
    this.carterasService.cargarSaldoTixEmpresas().subscribe((data: any) => {
      this.saldo = data.data.wallets[0].walletSALDOATM;
    });
  }
  teclado(evento) {
    switch (evento) {
      case "coma":
        this.coma();
        break;
      case "borrar":
        this.eliminar();
        break;
      default:
        this.agregar(evento);
        break;
    }
  }
  coma() {
    if (this.exitePunto && !this.bandera) return;
    this.cantidad = parseFloat(this.cantidad.toString().concat("."));
    this.bandera = true;
  }
  eliminar() {
    if (this.bandera) this.bandera = false;
    if (this.cantidad.toString().length == 1) return (this.cantidad = 0);
    this.cantidad = parseFloat(
      this.cantidad.toString().substring(0, this.cantidad.toString().length - 1)
    );
  }
  agregar(evento) {
    if (this.bandera)
      if (!this.exitePunto)
        return (this.cantidad = parseFloat(
          this.cantidad.toString().concat("." + evento)
        ));
    if (this.exitePunto) if (this.cantidadDecimales >= 2) return;
    this.cantidad = parseFloat(this.cantidad.toString().concat(evento));
  }
  get cantidadDecimales() {
    return this.cantidad.toString().substr(this.posicionPunto).length;
  }
  get exitePunto() {
    return this.cantidad.toString().includes(".");
  }
  get posicionPunto() {
    return this.cantidad.toString().indexOf(".") + 1;
  }

  confirma() {
    console.log(this.informacion);
    this.funcion.emit({ cantidad: this.cantidad, opcion: 2 });
  }
}
