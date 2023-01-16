import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdiomaInicialPageRoutingModule } from './idioma-inicial-routing.module';

import { IdiomaInicialPage } from './idioma-inicial.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdiomaInicialPageRoutingModule,
    TranslateModule
  ],
  declarations: [IdiomaInicialPage]
})
export class IdiomaInicialPageModule {}
