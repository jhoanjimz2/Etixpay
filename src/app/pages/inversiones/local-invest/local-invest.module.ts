import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalInvestPageRoutingModule } from './local-invest-routing.module';

import { LocalInvestPage } from './local-invest.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from '../../../shared/shaerd.module';
import { InvestModule } from '../components/invest.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalInvestPageRoutingModule,
    TranslateModule,
    PipesModule,
    SharedModule,
    InvestModule
  ],
  declarations: [LocalInvestPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalInvestPageModule {}
