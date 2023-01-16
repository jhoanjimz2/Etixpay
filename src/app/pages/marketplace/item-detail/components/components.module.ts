import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { ModalPayComponent } from './modal-pay/modal-pay.component';
import { ModalPayConfirComponent } from './modal-pay-confir/modal-pay-confir.component';
import { ModalPurchaceSuccComponent } from './modal-purchace-succ/modal-purchace-succ.component';
import { ModalPurchaceErrorComponent } from './modal-purchace-error/modal-purchace-error.component';



@NgModule({
  declarations: [
    ModalPayComponent,
    ModalPayConfirComponent,
    ModalPurchaceSuccComponent,
    ModalPurchaceErrorComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }

