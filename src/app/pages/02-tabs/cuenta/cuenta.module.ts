import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaPageRoutingModule } from './cuenta-routing.module';

import { CuentaPage } from './cuenta.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { CuentaComponentsModule } from './components/cuenta-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CuentaPageRoutingModule,
    CuentaComponentsModule,
    SharedModule
  ],
  declarations: [CuentaPage]
})
export class CuentaPageModule {}
