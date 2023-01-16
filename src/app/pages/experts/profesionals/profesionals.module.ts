import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalsPageRoutingModule } from './profesionals-routing.module';

import { ProfesionalsPage } from './profesionals.page';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { ComponentsModule } from './components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalsPageRoutingModule,
    TranslateModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [ProfesionalsPage]
})
export class ProfesionalsPageModule {}
