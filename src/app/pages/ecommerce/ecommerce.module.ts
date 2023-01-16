import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcommercePageRoutingModule } from './ecommerce-routing.module';

import { EcommercePage } from './ecommerce.page';
import { EcommerceComponentsModule } from './components/ecommerce-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcommercePageRoutingModule,
    EcommerceComponentsModule,
    TranslateModule,
    SharedModule
    
  ],
  declarations: [EcommercePage]
})
export class EcommercePageModule {}
