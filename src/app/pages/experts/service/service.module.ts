import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicePageRoutingModule } from './service-routing.module';

import { ServicePage } from './service.page';
import { SharedModule } from '../../../shared/shaerd.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicePageRoutingModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ServicePage]
})
export class ServicePageModule {}
