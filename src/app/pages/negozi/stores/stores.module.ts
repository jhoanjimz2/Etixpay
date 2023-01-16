import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { NegoziComponentsModule } from '../components/negozi-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoresPageRoutingModule,

    NegoziComponentsModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [StoresPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoresPageModule {}
