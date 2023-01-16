import { Injectable } from "@angular/core";

import { ConexionService } from "./conexion.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MetodosPagoService extends ConexionService {
  constructor(private http: HttpClient) {
    super(http);
  }
  cargar_cuentas() {
    return this.consultaGETAUTENTICADAV2("etixpay/payments/cards-user");
  }
  guardar_tarjeta(card, email, source) {
    let data = { card: card, email: email, source: source };
    return this.consultaPOSTAUTENTICADAV2("etixpay/payments/save-card", data);
  }
  crear_intent_pay(description, amount, payment_method, email) {
    let data = { description, amount, payment_method, email };
    return this.consultaPOSTAUTENTICADAV2(
      "etixpay/payments/stripe/create-pay-intent",
      data
    );
  }
  crear_intent_pay_sin_tarjetas(description, amount) {
    let data = { description, amount };
    return this.consultaPOSTAUTENTICADAV2(
      "etixpay/payments/create-pay-intent",
      data
    );
  }
  crear_intent_pay_con_tarjetas(card, amount, description) {
    let data = { card, amount, description };
    return this.consultaPOSTAUTENTICADAV2_sin_form_data(
      "etixpay/payments/stripe/create-pay-intent-by-card",
      data
    );
  }
  pagar(source, paymentMethod, saveCard, amount) {
    let data = {
      source: source,
      paymentMethod: paymentMethod,
      saveCard: saveCard,
      amount: amount,
    };
    return this.consultaPOSTAUTENTICADAV2("etixpay/payments/pay", data);
  }
  cuentas_bancarias_personas() {
    return this.consultaGETAUTENTICADA("cliente/perfil/cuentas-bancarias");
  }
  cuentas_bancarias_empresas() {
    return this.consultaGETAUTENTICADA("empresas/perfil/cuentas-bancarias");
  }
  saldo_tix_personas() {
    return this.consultaGETAUTENTICADA("apps/cliente/dashboard");
  }
  saldo_tix_empresas() {
    return this.consultaGETAUTENTICADA("empresas/dashboard");
  }
  confirmar_pay_intent(payment_intent, payment_method) {
    let data = { payment_intent, payment_method };
    return this.consultaPOSTAUTENTICADAV2(
      "etixpay/payments/stripe/confirm-pay-intent",
      data
    );
  }
  payCash(data: any) {
    return this.payCashService(
      "etixpay/payments/code-pay-cash/validate-pay",
      data
    );
  }
}
