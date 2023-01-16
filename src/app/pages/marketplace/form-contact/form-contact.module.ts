import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormContactPageRoutingModule } from './form-contact-routing.module';

import { FormContactPage } from './form-contact.page';
import { ModalFormComponentsModule } from './components/modal-form-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from '../../../shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormContactPageRoutingModule,
    ModalFormComponentsModule,
    TranslateModule,
    PipesModule,
    SharedModule
  ],
  declarations: [FormContactPage]
})
export class FormContactPageModule {}
