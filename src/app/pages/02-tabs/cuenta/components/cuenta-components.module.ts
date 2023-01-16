import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NosCalificaMenuCComponent } from './nos-califica-menu-c/nos-califica-menu-c.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { MisVouchersComponent } from './mis-vouchers/mis-vouchers.component';
import { MisEventosCComponent } from './mis-eventos-c/mis-eventos-c.component';
import { InformacionLegalMenuCComponent } from './informacion-legal-menu-c/informacion-legal-menu-c.component';
import { CartaEticaComponent } from './carta-etica/carta-etica.component';
import { ModuloCrearCuentaProfesionalModule } from './crear-cuenta-profesional-menu-c/components/modulo-crear-cuenta-profesional.module';
import { ModuloAyudaModule } from '../../../ayuda/components/modulo-ayuda.module';
import { ModuloEtixcashModule } from 'src/app/pages/etixcash/components/modulo-etixcash.module';



@NgModule({
  declarations: [
    NosCalificaMenuCComponent,
    MyItemsComponent,
    MisVouchersComponent,
    MisEventosCComponent,
    InformacionLegalMenuCComponent,
    CartaEticaComponent
  ],
  exports: [
    NosCalificaMenuCComponent,
    MyItemsComponent,
    MisVouchersComponent,
    MisEventosCComponent,
    InformacionLegalMenuCComponent,
    CartaEticaComponent,
    ModuloCrearCuentaProfesionalModule,
    ModuloAyudaModule,
    ModuloEtixcashModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    SharedModule,
    ModuloAyudaModule,
    ModuloCrearCuentaProfesionalModule,
    ModuloEtixcashModule
  ] 
})
export class CuentaComponentsModule { }
