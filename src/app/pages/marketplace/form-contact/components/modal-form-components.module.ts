import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalFormContactComplComponent } from './modal-form-contact-compl/modal-form-contact-compl.component';



@NgModule({
  declarations: [
    ModalFormContactComplComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    ModalFormContactComplComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalFormComponentsModule { }
