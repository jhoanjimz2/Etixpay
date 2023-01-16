import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TicketPageRoutingModule } from "./ticket-routing.module";

import { TicketPage } from "./ticket.page";
import { SharedModule } from "../../../shared/shaerd.module";
import { PipesModule } from "../../../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { TecladoComponent } from "./components/teclado/teclado.component";
import { CantidadComponent } from "./components/cantidad/cantidad.component";
import { EnviandoComponent } from "./components/enviando/enviando.component";
import { ExitoComponent } from "./components/exito/exito.component";
import { FalloComponent } from "./components/fallo/fallo.component";
import { CashComponent } from "./components/cash/cash.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketPageRoutingModule,
    SharedModule,
    PipesModule,
    TranslateModule,
  ],
  declarations: [
    TicketPage,
    TecladoComponent,
    CantidadComponent,
    EnviandoComponent,
    ExitoComponent,
    FalloComponent,
    CashComponent,
  ],
})
export class TicketPageModule {}
