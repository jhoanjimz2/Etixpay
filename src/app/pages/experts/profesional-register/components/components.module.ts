import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAuthorizationComponent } from './card-authorization/card-authorization.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { StepsComponent } from './steps/steps.component';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DataFiscalComponent } from './data-fiscal/data-fiscal.component';
import { CardRecompensaComponent } from './card-recompensa/card-recompensa.component';
import { MapaDescripcionFotoComponent } from './mapa-descripcion-foto/mapa-descripcion-foto.component';
import { ResumenComponent } from './resumen/resumen.component';
import { ExitoComponent } from './exito/exito.component';
import { ModalMapComponent } from './modal-map/modal-map.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";



@NgModule({
  declarations: [
    HeaderComponent,
    StepsComponent,
    AuthorizationComponent,
    CardAuthorizationComponent,
    ContactDetailComponent,
    DataFiscalComponent,
    CardRecompensaComponent,
    MapaDescripcionFotoComponent,
    ResumenComponent,
    ExitoComponent,
    ModalMapComponent
  ],
  exports: [
    HeaderComponent,
    StepsComponent,
    AuthorizationComponent,
    ContactDetailComponent,
    DataFiscalComponent,
    MapaDescripcionFotoComponent,
    ResumenComponent,
    ExitoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
