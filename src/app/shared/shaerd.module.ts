
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderPadreComponent } from './header-padre/header-padre.component';
import { HeaderTabsComponent } from './header-padre/headers/header-tabs/header-tabs.component';
import { HeaderPageComponent } from './header-padre/headers/header-page/header-page.component';
import { AlertComponent } from './alert/alert.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IonicRatingModule } from 'ionic4-rating';
import { MetodoDePagoComponent } from './metodo-de-pago/metodo-de-pago.component';
import { ValoracionConEstrellasComponent } from './valoracion-con-estrellas/valoracion-con-estrellas.component';
import { MetodoDePagoTresComponent } from './metodo-de-pago-tres/metodo-de-pago-tres.component';
import { MetodosDePagoCuatroComponent } from './metodos-de-pago-cuatro/metodos-de-pago-cuatro.component';
import { BotonSegmentComponent } from './boton-segment/boton-segment.component';
import { SelectCantidadComponent } from './select-cantidad/select-cantidad.component';
import { LectorQrComponent } from './lector-qr/lector-qr.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { SharingSocialsComponent } from './sharing-socials/sharing-socials.component';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      PipesModule,
      TranslateModule,
      ReactiveFormsModule,
      TranslateModule,
      NgxMaskModule,
      IonicRatingModule,
      NgxScannerQrcodeModule
    ],
    declarations: [
      HeaderPadreComponent,
      HeaderTabsComponent,
      HeaderPageComponent,
      MetodoDePagoComponent,
      ValoracionConEstrellasComponent,
      MetodoDePagoTresComponent,
      MetodosDePagoCuatroComponent,
      BotonSegmentComponent,
      SelectCantidadComponent,
      AlertComponent,
      LectorQrComponent,
      SharingSocialsComponent
    ],
    exports: [
      HeaderPadreComponent,
      MetodoDePagoComponent,
      ValoracionConEstrellasComponent,
      MetodoDePagoTresComponent,
      MetodosDePagoCuatroComponent,
      BotonSegmentComponent
    ],
    providers: [],
    bootstrap: []
  })
  export class SharedModule { }