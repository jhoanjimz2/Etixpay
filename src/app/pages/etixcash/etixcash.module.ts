import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtixcashPageRoutingModule } from './etixcash-routing.module';

import { EtixcashPage } from './etixcash.page';
import { ModuloEtixcashModule } from './components/modulo-etixcash.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtixcashPageRoutingModule,
    ModuloEtixcashModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [EtixcashPage]
})
export class EtixcashPageModule {}
