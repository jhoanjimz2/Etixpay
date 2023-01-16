import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMethodsPageRoutingModule } from './payment-methods-routing.module';

import { PaymentMethodsPage } from './payment-methods.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shaerd.module';
import { AjustesComponentsModule } from '../ajustes-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentMethodsPageRoutingModule,
    TranslateModule,
    SharedModule,
    AjustesComponentsModule
  ],
  declarations: [PaymentMethodsPage]
})
export class PaymentMethodsPageModule {}
