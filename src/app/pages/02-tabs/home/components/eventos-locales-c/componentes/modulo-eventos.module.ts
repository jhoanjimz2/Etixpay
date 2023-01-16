import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { CardEventoComponent } from './card-evento/card-evento.component';
import { BotonLikeEventosComponent } from './boton-like-eventos/boton-like-eventos.component';
import { CardTicketCompradoComponent } from './card-ticket-comprado/card-ticket-comprado.component';
import { ComprarTicketEventoComponent } from './comprar-ticket-evento/comprar-ticket-evento.component';
import { SharedModule } from 'src/app/shared/shaerd.module';
import { CrearUnEventoComponent } from './crear-un-evento/crear-un-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IonicSelectableModule } from 'ionic-selectable';
import { DescripcionEventoComponent } from './descripcion-evento/descripcion-evento.component';
import { DescripcionEventoCompradoComponent } from './descripcion-evento-comprado/descripcion-evento-comprado.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { ExitoComponent } from './exito/exito.component';
import { EventosLocalesComponent } from './eventos-locales/eventos-locales.component';
import { RegalarTicketComponent } from './regalar-ticket/regalar-ticket.component';
import { EventosLocalesCComponent } from '../eventos-locales-c.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';



@NgModule({
  declarations: [
    EventosLocalesCComponent,
    CardEventoComponent,
    BotonLikeEventosComponent,
    CardTicketCompradoComponent,
    ComprarTicketEventoComponent,
    CrearUnEventoComponent,
    DescripcionEventoComponent,
    DescripcionEventoCompradoComponent,
    EditarEventoComponent,
    ExitoComponent,
    EventosLocalesComponent,
    RegalarTicketComponent,
    ProgressBarComponent
  ],
  exports: [
    EventosLocalesCComponent,
    CardEventoComponent,
    BotonLikeEventosComponent,
    CardTicketCompradoComponent,
    ComprarTicketEventoComponent,
    CrearUnEventoComponent,
    DescripcionEventoComponent,
    DescripcionEventoCompradoComponent,
    EditarEventoComponent,
    ExitoComponent,
    EventosLocalesComponent,
    RegalarTicketComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IonicSelectableModule,
    SharedModule
  ]
})
export class ModuloEventosModule { }
