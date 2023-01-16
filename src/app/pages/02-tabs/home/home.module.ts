import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { ModuloEventosModule } from './components/eventos-locales-c/componentes/modulo-eventos.module';
import { ModuloCuponesModule } from './components/cupones-c/componentes/modulo-cupones.module';
import { EcommerceComponentsModule } from '../../ecommerce/components/ecommerce-components.module';
import { NegoziComponentsModule } from '../../negozi/components/negozi-components.module';
import { MapaModule } from '../../mapa/components/mapa.module';
import { InvestModule } from '../../inversiones/components/invest.module';
import { HomeComponentsModule } from './components/home-components.module';
import { ComponentsMarketplaceModule } from '../../marketplace/components/components-marketplace.module';
import { ExpertsComponentsModule } from '../../experts/components/experts-components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule,
    PipesModule,
    SharedModule,
    EcommerceComponentsModule,
    NegoziComponentsModule,
    MapaModule,
    ComponentsMarketplaceModule,
    SharedModule,
    InvestModule,
    ExpertsComponentsModule,

    
    
    ModuloEventosModule,
    ModuloCuponesModule,
    HomeComponentsModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
