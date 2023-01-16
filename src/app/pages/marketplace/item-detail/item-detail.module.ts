import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailPageRoutingModule } from './item-detail-routing.module';

import { ItemDetailPage } from './item-detail.page';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule,
    PipesModule,
    SharedModule
  ],
  declarations: [ItemDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemDetailPageModule {}
