import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltrosPageRoutingModule } from './filtros-routing.module';

import { FiltrosPage } from './filtros.page';
import { SharedModule } from '../../../shared/shaerd.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrosPageRoutingModule,
    SharedModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [FiltrosPage]
})
export class FiltrosPageModule {}
