import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';

import { StorePage } from './store.page';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule,
    SharedModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [
    StorePage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorePageModule {}
