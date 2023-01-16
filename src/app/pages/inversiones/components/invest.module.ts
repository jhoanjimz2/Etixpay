import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from 'src/app/shared/shaerd.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { InvestHomeComponent } from './invest-home/invest-home.component';
import { ObjectProyectComponent } from './object-proyect/object-proyect.component';
import { RelojRegresivoComponent } from './reloj-regresivo/reloj-regresivo.component';
import { FormCardComponent } from './form-card/form-card.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { RelojHomeComponent } from './reloj-home/reloj-home.component';



@NgModule({
  declarations: [
    InvestHomeComponent,
    ObjectProyectComponent,
    RelojRegresivoComponent,
    ConfirmacionComponent,
    FormCardComponent,
    RelojHomeComponent
  ],
  exports: [
    InvestHomeComponent,
    ObjectProyectComponent,
    FormCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,

    SharedModule,
    NgxMaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvestModule { }
