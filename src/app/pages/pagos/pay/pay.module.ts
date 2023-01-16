import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './pay-routing.module';

import { PayPage } from './pay.page';
import { SharedModule } from '../../../shared/shaerd.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    NgxMaskModule,
    TranslateModule
  ],
  declarations: [PayPage]
})
export class PayPageModule {}
