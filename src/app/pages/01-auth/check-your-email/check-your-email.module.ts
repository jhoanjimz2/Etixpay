import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckYourEmailPageRoutingModule } from './check-your-email-routing.module';

import { CheckYourEmailPage } from './check-your-email.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckYourEmailPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule 
  ],
  declarations: [CheckYourEmailPage]
})
export class CheckYourEmailPageModule {}
