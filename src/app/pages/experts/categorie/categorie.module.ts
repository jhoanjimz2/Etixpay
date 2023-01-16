import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriePageRoutingModule } from './categorie-routing.module';

import { CategoriePage } from './categorie.page';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriePageRoutingModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [CategoriePage]
})
export class CategoriePageModule {}
