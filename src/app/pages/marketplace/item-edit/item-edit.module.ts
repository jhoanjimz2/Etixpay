import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemEditPageRoutingModule } from './item-edit-routing.module';

import { ItemEditPage } from './item-edit.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ItemEditComponentsModule } from './components/item-edit-components.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { SharedModule } from '../../../shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemEditPageRoutingModule,
    TranslateModule,
    PipesModule,
    ItemEditComponentsModule,
    IonicSelectableModule,
    SharedModule
  ],
  declarations: [ItemEditPage]
})
export class ItemEditPageModule {}
