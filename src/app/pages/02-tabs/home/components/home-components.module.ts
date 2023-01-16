import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { TolbarBotonesComponent } from './tolbar-botones/tolbar-botones.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { RegistroDiarioCComponent } from './registro-diario-c/registro-diario-c.component';
import { FormsModule } from '@angular/forms';
import { EtixmallComponent } from './etixmall/etixmall.component';
import { InfoCommunityComponent } from './info-community/info-community.component';
import { PipesModule } from '../../../../pipes/pipes.module';



@NgModule({
  declarations: [
    TolbarBotonesComponent,
    TutorialsComponent,
    SearchBarComponent,
    PublicidadComponent,
    RegistroDiarioCComponent,
    EtixmallComponent,
    InfoCommunityComponent
  ],
  exports: [
    TolbarBotonesComponent,
    TutorialsComponent,
    SearchBarComponent,
    PublicidadComponent,
    RegistroDiarioCComponent,
    EtixmallComponent,
    InfoCommunityComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    PipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponentsModule { }
