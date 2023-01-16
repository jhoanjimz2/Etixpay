import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetNewPasswordPageRoutingModule } from './set-new-password-routing.module';

import { SetNewPasswordPage } from './set-new-password.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetNewPasswordPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [SetNewPasswordPage]
})
export class SetNewPasswordPageModule {}
