import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MetodosPagoService } from "src/app/services/metodos-pago.service";
import { CargandoService } from "src/app/services/cargando.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PopoverController, ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import * as countdown from "countdown";
import { Time } from "@angular/common";
import * as moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { ActivatedRoute } from "@angular/router";
import { HomeService } from "../../../../services/home.service";
import { Card } from "../../../paginas-usuarios/cartera/components/botones/recargas/recargas.component";
import { ConfirmacionComponent } from "../confirmacion/confirmacion.component";
@Component({
  selector: "app-buy-invest",
  templateUrl: "./buy-invest.page.html",
  styleUrls: ["./buy-invest.page.scss"],
})
export class BuyInvestPage {
  proyecto: any;

  prev_select = [
    {
      seleccionado: true,
      nombre: "TIX",
      texto: JSON.parse(localStorage.getItem("user")).username,
      img: "/assets/tabs/componentes/tix.png",
      tipo: "TIX",
      id: null,
    },
  ];

  activeForm = [
    {
      active: false,
    },
  ];

  timer_id: number = null;
  tiempo_restante: any = null;

  total = 0;
  comision = 0;
  puntos_recompensa = 0;

  formulario;

  validCard = {
    valid: false,
    card: null,
    save: false,
  };
  card: Card = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    name: null,
  };

  constructor(
    public route: ActivatedRoute,
    private form_builder: FormBuilder,
    private cargando_service: CargandoService,
    private metodos_pago_service: MetodosPagoService,
    private popover_controller: PopoverController,
    private home_service: HomeService,
    private modal_controller: ModalController
  ) {
    this.route.queryParams.subscribe((params) => {
      this.proyecto = JSON.parse(params.order);
      this.reloj_inicial();
      this.cargar_formulario();
    });
  }
  selectA(event) {
    this.prev_select[0] = event;
    this.activeForm[0].active = false;
  }
  selectF(event) {
    if (event.active) {
      this.prev_select[0].seleccionado = false;
    } else {
      this.prev_select[0].seleccionado = true;
    }
  }
  validTarjeta(event) {
    this.validCard = event;
    if (event.valid) this.card = event.card;
  }

  terminos_y_condiciones() {
    window.open(environment.TyC);
  }
  ngOnDestroy(): void {
    if (this.timer_id) {
      clearInterval(this.timer_id);
    }
  }
  reloj_inicial() {
    let date = new Date(
      moment(this.proyecto.proyectoFECHAFINAL).format("YYYY-MM-DD")
    );
    this.timer_id = countdown(
      date,
      (ts) => {
        this.tiempo_restante = ts;
      },
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
  }
  cargar_formulario() {
    let precio = new Intl.NumberFormat("it-IT", {
      minimumSignificantDigits: 5,
    }).format(this.proyecto.proyectoPRECIO);
    this.formulario = this.form_builder.group({
      cantidad: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(this.min),
        Validators.max(this.max),
      ]),
      precio: new FormControl({ value: precio, disabled: true }, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      check_uno: new FormControl(false, [
        Validators.required,
        Validators.requiredTrue,
      ]),
      check_dos: new FormControl(false, [
        Validators.required,
        Validators.requiredTrue,
      ]),
      check_tres: new FormControl(false, [
        Validators.required,
        Validators.requiredTrue,
      ]),
    });
  }
  get max(): number {
    if (this.proyecto.fase_actual)
      return this.proyecto.fase_actual.proyectoCOMPRAMAX;
    if (this.proyecto.current_phase)
      return this.proyecto.current_phase.proyectoCOMPRAMAX;
  }
  get min(): number {
    if (this.proyecto.fase_actual)
      return this.proyecto.fase_actual.proyectoCOMPRAMIN;
    if (this.proyecto.current_phase)
      return this.proyecto.current_phase.proyectoCOMPRAMIN;
  }
  comprar() {
    if (this.prev_select[0].seleccionado) {
      if (this.prev_select[0].tipo == "TIX") return this.comprar_proyecto_atm();
      if (this.prev_select[0].tipo == "TC")
        return this.crear_pay_intent_tarjeta_guardada();
    } else {
      this.crear_pay_intent_tarjeta_ingresada();
    }
  }
  sumar() {
    this.total =
      this.proyecto.proyectoPRECIO * this.formulario.controls.cantidad.value;
    if (this.proyecto.proyectoPORCENTAJEPUNTORECOMPENSA)
      this.puntos_recompensa =
        (this.total * this.proyecto.proyectoPORCENTAJEPUNTORECOMPENSA) / 100;
  }
  crear_pay_intent_tarjeta_guardada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service
      .crear_intent_pay(
        "Comprar PROYECTO " + this.proyecto.proyectoSIGLATOK,
        this.total,
        this.prev_select[0].id,
        JSON.parse(localStorage.getItem("user")).username
      )
      .subscribe(
        (data: any) => {
          this.confirmar_pay_intent(
            data.data.client_secret,
            data.data.payment_method
          );
        },
        (error) => {
          this.cargando_service.terminaCargando();
          this.Alert(error.error.message, "OK", true);
        }
      );
  }
  async confirmar_pay_intent(client_secret, payment_method) {
    const stripe = await loadStripe(environment.keyStripe);
    stripe
      .confirmCardPayment(client_secret, { payment_method: payment_method })
      .then((data: any) => {
        if (data.error) {
          this.cargando_service.terminaCargando();
          this.Alert(data.error.message, "OK", true);
        } else {
          this.comprar_proyecto(data.paymentIntent.id);
        }
      });
  }
  comprar_proyecto_atm() {
    this.cargando_service.iniciaCargando();
    this.home_service
      .comprar_proyecto_con_tix(
        this.proyecto.uuid,
        this.formulario.controls.cantidad.value,
        localStorage.getItem("wallet")
      )
      .subscribe(
        (data: any) => {
          this.cargando_service.terminaCargando();
          this.confirmacion_compra(
            true,
            this.formulario.controls.cantidad.value,
            this.proyecto.proyectoSIGLATOK
          );
        },
        (error) => {
          this.cargando_service.terminaCargando();
          this.confirmacion_compra(false);
        }
      );
  }
  async confirmacion_compra(type, cantidad?, siglas?) {
    const modal = await this.modal_controller.create({
      component: ConfirmacionComponent,
      componentProps: { type, cantidad, siglas },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    //if (data.data) this.comprar();
  }

  crear_pay_intent_tarjeta_ingresada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service
      .crear_intent_pay_con_tarjetas(
        this.card,
        this.total,
        "Comprar PROYECTO " + this.proyecto.proyectoSIGLATOK
      )
      .subscribe(
        (data: any) => {
          this.confirmar_pay_intent_ingresada(
            data.data.client_secret,
            data.data.payment_method
          );
        },
        (error) => {
          this.cargando_service.terminaCargando();
          this.Alert(error.error.message, "OK", true);
        }
      );
  }
  async confirmar_pay_intent_ingresada(client_secret, payment_method) {
    const stripe = await loadStripe(environment.keyStripe);
    stripe
      .confirmCardPayment(client_secret, { payment_method: payment_method })
      .then((data: any) => {
        if (data.error) {
          this.cargando_service.terminaCargando();
          this.Alert(data.error.message, "OK", true);
        } else {
          this.comprar_proyecto(data.paymentIntent.id);
        }
      });
  }

  comprar_proyecto(token) {
    this.home_service
      .comprar_proyecto_con_tarjeta(
        this.proyecto.uuid,
        localStorage.getItem("wallet"),
        this.formulario.controls.cantidad.value,
        token
      )
      .subscribe(
        (data: any) => {
          this.cargando_service.terminaCargando();
          this.confirmacion_compra(
            true,
            this.formulario.controls.cantidad.value,
            this.proyecto.proyectoSIGLATOK
          );
          if (!this.prev_select[0].seleccionado)
            if (this.validCard.save) this.guardarTarjeta();
        },
        (error) => {
          this.cargando_service.terminaCargando();
          this.confirmacion_compra(false);
        }
      );
  }

  guardarTarjeta() {
    let card = {
      number: this.card.number,
      exp_month: this.card.exp_month,
      exp_year: this.card.exp_year,
      cvc: this.card.cvc,
      name: this.card.name,
    };
    this.add_tarjeta_credito(card);
  }
  add_tarjeta_credito(card) {
    this.cargando_service.iniciaCargando();
    this.home_service
      .add_tarjeta_credito(
        card,
        JSON.parse(localStorage.getItem("user")).username
      )
      .subscribe(
        (data: any) => {
          this.cargando_service.terminaCargando();
        },
        (error) => {
          this.cargando_service.terminaCargando();
        }
      );
  }

  async Alert(tex, bot, value) {
    const popover = await this.popover_controller.create({
      component: AlertComponent,
      cssClass: "popover_central",
      mode: "ios",
      componentProps: {
        texto: tex,
        boton: bot,
        img: value,
      },
      translucent: false,
      backdropDismiss: false,
    });
    return await popover.present();
  }
}
