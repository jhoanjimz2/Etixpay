import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulacionPageRoutingModule } from './simulacion-routing.module';

import { SimulacionPage } from './simulacion.page';
import { SharedModule } from '../../../../shared/shaerd.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulacionPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [SimulacionPage]
})
export class SimulacionPageModule {}
