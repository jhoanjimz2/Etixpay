import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { EtixcashMenuComponent } from './etixcash-menu/etixcash-menu.component';
import { MovimientoEtixcashComponent } from './movimiento-etixcash/movimiento-etixcash.component';
import { DenegarEtixcashComponent } from './denegar-etixcash/denegar-etixcash.component';
import { DetalleEtixcashComponent } from './detalle-etixcash/detalle-etixcash.component';



@NgModule({
  declarations: [
    EtixcashMenuComponent,
    MovimientoEtixcashComponent,
    DenegarEtixcashComponent,
    DetalleEtixcashComponent
  ],
  exports: [
    EtixcashMenuComponent,
    MovimientoEtixcashComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class ModuloEtixcashModule { }
