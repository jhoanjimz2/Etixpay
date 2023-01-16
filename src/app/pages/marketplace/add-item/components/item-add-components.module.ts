import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalAddItemComplComponent } from './modal-add-item-compl/modal-add-item-compl.component';
import { ModalAddItemErrorComponent } from './modal-add-item-error/modal-add-item-error.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ModalAddItemComplComponent,
    ModalAddItemErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    ModalAddItemComplComponent,
    ModalAddItemErrorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemAddComponentsModule { }
