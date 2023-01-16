import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyInvestPageRoutingModule } from './buy-invest-routing.module';

import { BuyInvestPage } from './buy-invest.page';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { InvestModule } from '../invest.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyInvestPageRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    TranslateModule,
    SharedModule,
    InvestModule
  ],
  declarations: [BuyInvestPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuyInvestPageModule {}
