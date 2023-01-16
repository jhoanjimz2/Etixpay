import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePagePageRoutingModule } from './store-page-routing.module';

import { StorePagePage } from './store-page.page';
import { StoreComponentsModule } from './components/store-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePagePageRoutingModule,
    StoreComponentsModule,
    TranslateModule,
    PipesModule,
    SharedModule
  ],
  declarations: [StorePagePage]
})
export class StorePagePageModule {}
