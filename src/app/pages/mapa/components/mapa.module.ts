import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardObjetoComponent } from './card-objeto/card-objeto.component';
import { FiltrosMapaComponent } from './filtros-mapa/filtros-mapa.component';
import { MapaHomeComponent } from './mapa-home/mapa-home.component';
import { PopoverSugerenciaComponent } from './popover-sugerencia/popover-sugerencia.component';
import { SugerenciaTiendaComponent } from './sugerencia-tienda/sugerencia-tienda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { SoyPropietarioComponent } from './soy-propietario/soy-propietario.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedModule } from '../../../shared/shaerd.module';



@NgModule({
  declarations: [
    CardObjetoComponent,
    FiltrosMapaComponent,
    MapaHomeComponent,
    PopoverSugerenciaComponent,
    SugerenciaTiendaComponent,
    SoyPropietarioComponent
  ],
  exports: [
    CardObjetoComponent,
    MapaHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
    GooglePlaceModule,
    SharedModule
  ]
})
export class MapaModule { }
