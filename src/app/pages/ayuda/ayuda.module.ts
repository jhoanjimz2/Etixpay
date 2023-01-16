import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudaPageRoutingModule } from './ayuda-routing.module';

import { AyudaPage } from './ayuda.page';
import { ModuloAyudaModule } from './components/modulo-ayuda.module';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudaPageRoutingModule,
    ModuloAyudaModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [AyudaPage]
})
export class AyudaPageModule {}
