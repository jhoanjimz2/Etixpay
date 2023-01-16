import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { AccordionComponent } from './accordion/accordion.component';
import { AyudaMenuComponent } from './ayuda-menu/ayuda-menu.component';


@NgModule({
  declarations: [
    AccordionComponent,
    AyudaMenuComponent
  ],
  exports: [
    AccordionComponent,
    AyudaMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    SharedModule
  ] 
})
export class ModuloAyudaModule { }
