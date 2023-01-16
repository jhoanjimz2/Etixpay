import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosPageRoutingModule } from './pagos-routing.module';
import { AdvertenciaPayComponent } from './advertencia-pay/advertencia-pay.component';
import { SelectTypePayComponent } from './select-type-pay/select-type-pay.component';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { SelectTypePayOrdenComponent } from './select-type-pay-orden/select-type-pay-orden.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosPageRoutingModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [
    AdvertenciaPayComponent,
    SelectTypePayComponent,
    SelectTypePayOrdenComponent
  ]
})
export class PagosPageModule {}
