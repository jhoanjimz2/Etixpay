import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyItemsPageRoutingModule } from './my-items-routing.module';

import { MyItemsPage } from './my-items.page';
import { MyItemsComponentsModule } from './components/my-items-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shaerd.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyItemsPageRoutingModule,
    MyItemsComponentsModule,
    TranslateModule,
    PipesModule,
    SharedModule
  ],
  declarations: [MyItemsPage]
})
export class MyItemsPageModule {}
