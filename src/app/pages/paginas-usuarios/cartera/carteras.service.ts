import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ConexionService } from 'src/app/services/conexion.service';

@Injectable({
  providedIn: 'root'
})
export class CarterasService  extends ConexionService {

  constructor(private http: HttpClient
    ) {
    super(http);
  }
  cargarSaldoTixPersonas() {
    return this.consultaGETAUTENTICADA('apps/cliente/dashboard');
  }
  cargarSaldoTixEmpresas() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }
  //MOVIMIENTOS
  movimientosALL(wallet, pagina) {
    return this.consultaGETAUTENTICADA('cliente/movimientos/' + wallet + '/listado/all?page=' + pagina);
  }
  movimientosALLFechaIniFechaFin(wallet, movimientoFECHAINICIO, movimientoFECHAFINAL, pagina) {
    let data = {'movimientoFECHAINICIO': movimientoFECHAINICIO, 'movimientoFECHAFINAL': movimientoFECHAFINAL};
    return this.consultaPOSTAUTENTICADA2('cliente/movimientos/' + wallet + '/busqueda?page=' + pagina, data);
  }
  movimientosIN(wallet, pagina) {
    return this.consultaGETAUTENTICADA('cliente/movimientos/' + wallet + '/listadoIn/all?page='+ pagina);
  }
  movimientosOUT(wallet, pagina) {
    return this.consultaGETAUTENTICADA('cliente/movimientos/' + wallet + '/listadoOut/all?page='+ pagina);
  }
  movimientosPENDIENTES(wallet, pagina) {
    return this.consultaGETAUTENTICADA('cliente/movimientos/' + wallet + '/listado/pendientes/all?page='+ pagina);
  }
  generarClaveDinamica() {
    return this.consultaPOSTAUTENTICADASINDATA('cliente/seguridad/clave-dinamica');
  }
  aprobarSolicitudDeTransaccion(wallet, uuid, clave_dinamicaTOKEN) {
    let data = { 'clave_dinamicaTOKEN': clave_dinamicaTOKEN  };
    return this.consultaPUTAUTENTICADA2('cliente/transferencia/solicitudes/' + wallet + '/aprobar/' + uuid, data);
  }
  movimientosAPROBAR(wallet, uuid) {
    return this.consultaGETAUTENTICADA('cliente/transferencia/' + wallet + '/aprobar/' + uuid);
  }
  denegarSolicitudDeTransaccion(wallet, uuid) {
    return this.consultaPUTAUTENTICADASINDATA('cliente/transferencia/solicitudes/' + wallet + '/denegar/' + uuid);
  }
  movimientosDENEGAR(wallet, uuid) {
    return this.consultaGETAUTENTICADA('cliente/transferencia/' + wallet + '/denegar/' + uuid);
  }
  //MOVIMIENTOS

  //ENVIAR
  consultaWalletQR(uuid) {
    return this.consultaGETAUTENTICADA('cliente/wallet/' + uuid);
  }
  mostrarTicketsPersonas() {
    return this.consultaGETAUTENTICADA('cliente/dashboard/actualizar');
  }
  mostrarTicketsEmpresas() {
    return this.consultaGETAUTENTICADA('empresas/dashboard/actualizar');
  }
  claveDinamica(cantidad) {
    let data = { 'trasaccionAMOUNT': cantidad};
    return this.consultaPOSTAUTENTICADA('cliente/seguridad/clave-dinamica', data);
  }
  transferirTIXENVIAR(claveDinamica?, transferenciaAMOUNT?, transferenciaCODIGOWALLET?, wallet?) {
    let data = {
      'clave_dinamicaTOKEN': claveDinamica,
      'transferenciaCODIGOWALLET': transferenciaCODIGOWALLET,
      'transferenciaAMOUNT': transferenciaAMOUNT
    };
    return this.consultaPOSTAUTENTICADA('cliente/transferencia/' + wallet + '/atm', data);
  }
  transferirTICKETENVIAR(clave_dinamicaTOKEN?, wallet?, transferenciaAMOUNT?, transferenciaCODIGOWALLET?, transferenciaTICKET?, transferenciaATM?) {
    let data = {
      clave_dinamicaTOKEN,
      transferenciaCODIGOWALLET,
      transferenciaAMOUNT,
      transferenciaTICKET,
      transferenciaATM
    };
    return this.consultaPOSTAUTENTICADA('cliente/transferencia/' + wallet + '/ticket', data);
  }
  contactos(clienteCONTACTOS) {
    let data = {'clienteCONTACTOS': clienteCONTACTOS};
    return this.consultaPOSTAUTENTICADA('cliente/friends/match', data);
  }
  muestraUsuarioInvitados() {
    return this.consultaGETAUTENTICADA('cliente/referidos');
  }
  //ENVIAR

  //RECIBIR
  crearPayATM(wallet, transferenciaAMOUNT, transferenciaAMOUNTEXTRA?) {
    let data = { transferenciaAMOUNT, transferenciaAMOUNTEXTRA };
    return this.consultaPOSTAUTENTICADA('cliente/recibe/' + wallet + '/atm', data);
  }
  pagar_con_efectivo(
    pay_efectivoTOTALCONDESCUENTO, 
    pay_efectivoTOTALSINDESCUENTO, 
    pay_efectivoOBSERVACION, 
    pay_efectivoWALLETHACIACODIGO,
    pay_efectivoWALLETDESDECODIGO
    ) {
    let data = { 
      pay_efectivoTOTALCONDESCUENTO, pay_efectivoTOTALSINDESCUENTO, pay_efectivoOBSERVACION,
      pay_efectivoWALLETHACIACODIGO, pay_efectivoWALLETDESDECODIGO
    };
    return this.consultaPOSTAUTENTICADAV2('etixpay/payments/pay-cash', data);
  }
  verPAY(wallet, uuid) {
    return this.consultaGETAUTENTICADA('cliente/pay/' + wallet + '/show/' + uuid);
  }
  generarSolicitudDeTransferencia(wallet, transferenciaCODIGOWALLET, transferenciaAMOUNT) {
    let data = {  'transferenciaCODIGOWALLET': transferenciaCODIGOWALLET,  'transferenciaAMOUNT': transferenciaAMOUNT };
    return this.consultaPOSTAUTENTICADA('cliente/transferencia/solicitudes/' + wallet, data);
  }
  //RECIBIR
  //RETIROS
  walletQR(uuid) {
    return this.consultaGETAUTENTICADA('cliente/wallet/' + uuid);
  }
  clave_dinamica(cantidad) {
    let data = { 'trasaccionAMOUNT': cantidad};
    return this.consultaPOSTAUTENTICADA('cliente/seguridad/clave-dinamica', data);
  }
  retiro_transfer_banco( clave_dinamicaTOKEN, metodoPagoID, trasaccionAMOUNT, user_solicitud_retiroOBSERVACIONES, walletCODIGO) {
    let data = {
      clave_dinamicaTOKEN,
      metodoPagoID,
      trasaccionAMOUNT,
      user_solicitud_retiroOBSERVACIONES,
      walletCODIGO
    };
    return this.consultaPOSTAUTENTICADA('cliente/solicitud/retiro', data);
  }
  retiro_etixcash(
    walletCODIGO, trasaccionAMOUNT, transaccionMONEDACONVERSION, 
    transaccionWALLETEMPRESA, clave_dinamicaTOKEN
    ) {
    let data = {
      walletCODIGO, trasaccionAMOUNT, transaccionMONEDA: '1', transaccionMONEDATASA: '1', 
      transaccionMONEDACONVERSION, transaccionWALLETEMPRESA, clave_dinamicaTOKEN
    };
    return this.consultaPOSTAUTENTICADA('cliente/solicitud/retiro/etixcard', data);
  }
  add_tarjeta_credito(card, email, source) {
    let data = {  card: card,  email: email,  source: source   }
    return this.consultaPOSTAUTENTICADAV2('etixpay/payments/save-card', data);
  }
  add_tarjeta_credito_sin_form_data(card, email) {
    let data = {  card,  email  }
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/payments/save-card', data);
  }
  //RETIROS

  //RECARGA
  comprar_tix_con_tarjeta(walletCODIGO, trasaccionAMOUNT, pay_intentID) {
    let data = { walletCODIGO, trasaccionAMOUNT, pay_intentID };
    return this.consultaPOSTAUTENTICADA2('cliente/proyectos/transacciones/atm/tarjetas-creditos', data);
  }
  comprar_tix_con_etixcash(walletCODIGO, trasaccionAMOUNT, transaccionMONEDA, transaccionMONEDATASA, transaccionMONEDACONVERSION, transaccionWALLETEMPRESA) {
    let data = { walletCODIGO, trasaccionAMOUNT, transaccionMONEDA, transaccionMONEDATASA, transaccionMONEDACONVERSION, transaccionWALLETEMPRESA };
    return this.consultaPOSTAUTENTICADA('cliente/proyectos/transacciones/atm/etix-card', data);
  }
  transferir_saldo_de_wallet_a_card(walletCode, cardNumber, amount) {
    let data = { walletCode, cardNumber, amount };
    return this.consultaPOSTAUTENTICADAV2('etixpay/wallets/recharge-card-atm', data);
  }
  //RECARGA
  
  qrs() {
    return this.consultaGETAUTENTICADA('cliente/qrs');
  }
  relacionar_card(cardNumber) {
    let data = { cardNumber }
    return this.consultaPOSTAUTENTICADAV2('etixpay/wallets/related-card-user', data);
  }
  cargar_card_especifico(cardNumber) {
    let data = { cardNumber }
    return this.consultaPOSTAUTENTICADAV2('etixpay/wallets/show-card', data);
  }
  cargar_cards() {
    return this.consultaGETAUTENTICADAV2('etixpay/wallets/my-list-card');
  }
  ver_pay(wallet, uuid) {
    return this.consultaGETAUTENTICADA('cliente/pay/' + wallet + '/show/' + uuid);
  }
  cambiar_alias(cardNumber, cardAlias) {
    let data = {cardNumber,cardAlias };
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/wallets/alias-card', data);
  }


}
