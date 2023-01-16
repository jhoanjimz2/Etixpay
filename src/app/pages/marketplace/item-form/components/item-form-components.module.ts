import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalInfoDelItemComponent } from './modal-info-del-item/modal-info-del-item.component';



@NgModule({
  declarations: [
    ModalInfoDelItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    ModalInfoDelItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemFormComponentsModule { }
