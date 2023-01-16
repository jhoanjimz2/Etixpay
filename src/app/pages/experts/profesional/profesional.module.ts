import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalPageRoutingModule } from './profesional-routing.module';

import { ProfesionalPage } from './profesional.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shaerd.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalPageRoutingModule,
    TranslateModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [ProfesionalPage]
})
export class ProfesionalPageModule {}
