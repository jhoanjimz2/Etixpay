import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { MapaModule } from '../components/mapa.module';
import { TranslateModule } from '@ngx-translate/core';
import {InfoMapComponent} from './components/info-map/info-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    TranslateModule,
    MapaModule
  ],
  declarations: [
      MapPage,
      InfoMapComponent
  ]
})
export class MapPageModule {}
