import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemPageRoutingModule } from './add-item-routing.module';

import { AddItemPage } from './add-item.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ItemAddComponentsModule } from './components/item-add-components.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { SharedModule } from '../../../shared/shaerd.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddItemPageRoutingModule,
    TranslateModule,
    PipesModule,
    ItemAddComponentsModule,
    IonicSelectableModule,
    SharedModule,
    GooglePlaceModule
  ],
  declarations: [AddItemPage]
})
export class AddItemPageModule {}
