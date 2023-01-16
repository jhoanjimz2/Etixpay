import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../../pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { BotonesComponent } from './botones/botones.component';
import { IonicModule } from '@ionic/angular';
import { MiBalanceComponent } from './mi-balance/mi-balance.component';
import { GraficaComponent } from './grafica/grafica.component';
import { ClaveDinamicaMovimientoComponent } from './botones/movimientos/componentes/clave-dinamica-movimiento/clave-dinamica-movimiento.component';
import { TipoMovimientoComponent } from './botones/movimientos/componentes/tipo-movimiento/tipo-movimiento.component';
import { MovimientoComponent } from './botones/movimientos/componentes/movimiento/movimiento.component';
import { ClaveDinamicaRetirarComponent } from './botones/retiros/componentes/clave-dinamica-retirar/clave-dinamica-retirar.component';
import { MovimientosComponent } from './botones/movimientos/movimientos.component';
import { RecargasComponent } from './botones/recargas/recargas.component';
import { RetirosComponent } from './botones/retiros/retiros.component';
import { EnviarComponent } from './botones/enviar/enviar.component';
import { DescripcionMovimientoComponent } from './botones/movimientos/componentes/descripcion-movimiento/descripcion-movimiento.component';
import { MisTarjetasComponent } from './toolbar-botones/mis-tarjetas/mis-tarjetas.component';
import { MovimientoPendienteComponent } from './botones/movimientos/componentes/movimiento-pendiente/movimiento-pendiente.component';
import { RecargaEtixcashComponent } from './botones/recarga-etixcash/recarga-etixcash.component';
import { TipoRecargaComponent } from './botones/tipo-recarga/tipo-recarga.component';
import { InscribirTarjetaEtixComponent } from './toolbar-botones/inscribir-tarjeta-etix/inscribir-tarjeta-etix.component';
import { MiWalletComponent } from './toolbar-botones/mi-wallet/mi-wallet.component';
import { RechargeComponent } from './toolbar-botones/recharge/recharge.component';
import { TopUpCardComponent } from './toolbar-botones/top-up-card/top-up-card.component';
import { PopoverCardsComponent } from './toolbar-botones/popover-cards/popover-cards.component';
import { AliasCardsComponent } from './toolbar-botones/alias-cards/alias-cards.component';
import { ToolbarBotonesComponent } from './toolbar-botones/toolbar-botones.component';
import { RecibirEmpresaComponent } from './recibir-empresa/recibir-empresa.component';
import { AlertDosComponent } from './botones/recibir/components/alert-dos/alert-dos.component';
import { ConfirmPayComponent } from './botones/recibir/components/confirm-pay/confirm-pay.component';
import { RecompensasComponent } from './toolbar-botones/recompensas/recompensas.component';
import { ItemRecompensaComponent } from './toolbar-botones/recompensas/componentes/item-recompensa/item-recompensa.component';
import { HistorialRecompensasComponent } from './toolbar-botones/recompensas/componentes/historial-recompensas/historial-recompensas.component';
import { LoteriaComponent } from './botones/loteria/loteria.component';
import { HistorialDeLoteriaComponent } from './botones/loteria/componentes/historial-de-loteria/historial-de-loteria.component';
import { RelojLoteriaComponent } from './botones/loteria/componentes/reloj-loteria/reloj-loteria.component';
import { EurosHastaRegaloComponent } from './botones/loteria/componentes/euros-hasta-regalo/euros-hasta-regalo.component';
import { FormularioTarjetaComponent } from './botones/recargas/formulario-tarjeta/formulario-tarjeta.component';
import { TarjetasComponent } from './botones/recargas/tarjetas/tarjetas.component';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { RecibirComponent } from './botones/recibir/recibir.component';
import { TecladoComponent } from './botones/recibir/components/teclado/teclado.component';
import { CantidadesComponent } from './botones/recibir/components/cantidades/cantidades.component';
import { SelectMetodPayComponent } from './botones/recibir/components/select-metod-pay/select-metod-pay.component';
import { MetodPayTicketComponent } from './botones/recibir/components/metod-pay-ticket/metod-pay-ticket.component';
import { MetodPayWalletComponent } from './botones/recibir/components/metod-pay-wallet/metod-pay-wallet.component';



@NgModule({
  declarations: [
    BotonesComponent,
    MiBalanceComponent,
    GraficaComponent,
    MovimientoComponent,
    TipoMovimientoComponent,
    ClaveDinamicaMovimientoComponent,
    ClaveDinamicaRetirarComponent,
    MovimientosComponent,
    RecargasComponent,
    RecargaEtixcashComponent,
    TipoRecargaComponent,
    RetirosComponent,
    EnviarComponent,
    DescripcionMovimientoComponent,
    InscribirTarjetaEtixComponent,
    MisTarjetasComponent,
    MovimientoPendienteComponent,
    MiWalletComponent,
    RechargeComponent,
    TopUpCardComponent,
    PopoverCardsComponent,
    AliasCardsComponent,
    ToolbarBotonesComponent,
    RecibirEmpresaComponent,
    AlertDosComponent,
    ConfirmPayComponent,
    RecompensasComponent,
    ItemRecompensaComponent,
    HistorialRecompensasComponent,
    LoteriaComponent,
    HistorialDeLoteriaComponent,
    RelojLoteriaComponent,
    EurosHastaRegaloComponent,
    FormularioTarjetaComponent,
    TarjetasComponent,

    RecibirComponent,
    TecladoComponent,
    CantidadesComponent,
    SelectMetodPayComponent,
    MetodPayTicketComponent,
    MetodPayWalletComponent
  ],
  exports: [
    BotonesComponent,
    MiBalanceComponent,
    GraficaComponent,
    ToolbarBotonesComponent,
    RecibirEmpresaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    NgxMaskModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ModuloComponentesWalletModule { }
