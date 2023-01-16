import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotYourPasswordPageRoutingModule } from './forgot-your-password-routing.module';

import { ForgotYourPasswordPage } from './forgot-your-password.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotYourPasswordPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ForgotYourPasswordPage]
})
export class ForgotYourPasswordPageModule {}
