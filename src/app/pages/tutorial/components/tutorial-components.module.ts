import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ModalWelcomeComponent } from './modal-welcome/modal-welcome.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shaerd.module';
@NgModule({
  declarations: [
    ModalWelcomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    NgxMaskModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ModalWelcomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TurorialComponentsModule { }

