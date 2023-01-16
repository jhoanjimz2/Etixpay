import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteraPageRoutingModule } from './cartera-routing.module';

import { ModuloComponentesWalletModule } from './components/modulo-componentes-wallet.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.module';
import { CarteraPage } from './cartera.page';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { InvestModule } from '../../inversiones/components/invest.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteraPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,


    ModuloComponentesWalletModule,
    SharedModule,
    InvestModule
  ],
  declarations: [CarteraPage]
})
export class CarteraPageModule {}
