import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AddMetodoPagoComponent } from './add-metodo-pago/add-metodo-pago.component';
import { CardMetodoPagoComponent } from './card-metodo-pago/card-metodo-pago.component';



@NgModule({
  declarations: [
    AddMetodoPagoComponent,
    CardMetodoPagoComponent
  ],
  exports: [
    CardMetodoPagoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ]
})
export class AjustesComponentsModule { }
