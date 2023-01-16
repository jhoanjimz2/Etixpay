import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { SharedModule } from '../../../shared/shaerd.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    TranslateModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
