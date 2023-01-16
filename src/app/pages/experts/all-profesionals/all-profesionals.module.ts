import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProfesionalsPageRoutingModule } from './all-profesionals-routing.module';

import { AllProfesionalsPage } from './all-profesionals.page';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from '../../../shared/shaerd.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProfesionalsPageRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [AllProfesionalsPage]
})
export class AllProfesionalsPageModule {}
