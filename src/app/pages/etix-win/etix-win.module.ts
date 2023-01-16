import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtixWinPageRoutingModule } from './etix-win-routing.module';

import { EtixWinPage } from './etix-win.page';
import { EtixwinComponentsModule } from './components/etixwin-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shaerd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtixWinPageRoutingModule,
    
    
    EtixwinComponentsModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [EtixWinPage]
})
export class EtixWinPageModule {}
