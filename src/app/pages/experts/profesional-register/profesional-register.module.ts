import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalRegisterPageRoutingModule } from './profesional-register-routing.module';

import { ProfesionalRegisterPage } from './profesional-register.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalRegisterPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [
    ProfesionalRegisterPage
  ]
})
export class ProfesionalRegisterPageModule {}
