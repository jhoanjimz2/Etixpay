import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemFormPage } from './item-form.page';
import { ItemFormPageRoutingModule } from './item-form-routing.module';
import { ItemFormComponentsModule } from './components/item-form-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from '../../../shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemFormPageRoutingModule,
    ItemFormComponentsModule,
    TranslateModule,
    PipesModule,
    SharedModule
  ],
  declarations: [ItemFormPage]
})
export class ItemFormPageModule {}
