import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { CuponesComponent } from './cupones/cupones.component';
import { CuponesCComponent } from '../cupones-c.component';
import { CardVoucherAdquiridoComponent } from './card-voucher-adquirido/card-voucher-adquirido.component';
import { CardVoucherComponent } from './card-voucher/card-voucher.component';
import { CardVoucherFlashComponent } from './card-voucher-flash/card-voucher-flash.component';
import { ComprarVoucherComponent } from './comprar-voucher/comprar-voucher.component';
import { EnviarVoucherComponent } from './enviar-voucher/enviar-voucher.component';
import { VerVoucherAdquiridoComponent } from './ver-voucher-adquirido/ver-voucher-adquirido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CardVoucherAllComponent } from './card-voucher-all/card-voucher-all.component';
import { CompraVoucherExitosaComponent } from './compra-voucher-exitosa/compra-voucher-exitosa.component';
import { SharedModule } from 'src/app/shared/shaerd.module';



@NgModule({
  declarations: [
    CuponesCComponent,
    CuponesComponent,
    CardVoucherAdquiridoComponent,
    CardVoucherComponent,
    CardVoucherFlashComponent,
    CardVoucherAllComponent,
    ComprarVoucherComponent,
    EnviarVoucherComponent,
    VerVoucherAdquiridoComponent,
    CompraVoucherExitosaComponent
  ],
  exports: [
    CuponesCComponent,
    CuponesComponent,
    CardVoucherAdquiridoComponent,
    CardVoucherComponent,
    CardVoucherFlashComponent,
    CardVoucherAllComponent,
    ComprarVoucherComponent,
    EnviarVoucherComponent,
    VerVoucherAdquiridoComponent,
    CompraVoucherExitosaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxMaskModule,
    SharedModule
  ]
})
export class ModuloCuponesModule { }
