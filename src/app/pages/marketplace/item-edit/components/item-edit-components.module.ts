import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalEditItemComplComponent } from './modal-edit-item-compl/modal-edit-item-compl.component';
import { ModalEditItemErrorComponent } from './modal-edit-item-error/modal-edit-item-error.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ModalEditItemComplComponent,
    ModalEditItemErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    ModalEditItemComplComponent,
    ModalEditItemErrorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemEditComponentsModule { }
