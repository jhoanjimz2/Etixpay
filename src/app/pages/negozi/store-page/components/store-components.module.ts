import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { GaleriaStoreComponent } from './galeria-store/galeria-store.component';
import { InfoLocalStoreComponent } from './info-local-store/info-local-store.component';
import { MapaStoreComponent } from './mapa-store/mapa-store.component';
import { VouchersStoreComponent } from './vouchers/vouchers-store/vouchers-store.component';
import { EventsStoreComponent } from './events-store/events-store.component';
import { ComentsStoreComponent } from './coments-store/coments-store.component';
import { CommentComponent } from './comment/comment.component';
import { IonicRatingModule } from 'ionic4-rating';
import { StarsComentsComponent } from './stars-coments/stars-coments.component';
import { RegisterVoucherComponent } from './vouchers/register-voucher/register-voucher.component';
import { VoucherPanelComponent } from './vouchers/voucher-panel/voucher-panel.component';
import { VoucherDescripcionComponent } from './vouchers/voucher-descripcion/voucher-descripcion.component';
import { PanelsVouchersComponent } from './vouchers/panels-vouchers/panels-vouchers.component';
import { VerImgComponent } from './ver-img/ver-img.component';
import { DescriptionComponent } from './description/description.component';
import { VerGaleriaComponent } from './ver-galeria/ver-galeria.component';
import { TixEuroAnimalComponent } from './tix-euro-animal/tix-euro-animal.component';
import { AlternativoComponent } from './alternativo/alternativo.component';
import { CambiarHorarioComponent } from './cambiar-horario/cambiar-horario.component';
import { SharedModule } from '../../../../shared/shaerd.module';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';



@NgModule({
  declarations: [
    GaleriaStoreComponent,
    InfoLocalStoreComponent,
    MapaStoreComponent,
    VouchersStoreComponent,
    EventsStoreComponent,
    ComentsStoreComponent,
    CommentComponent,
    StarsComentsComponent,
    RegisterVoucherComponent,
    VoucherPanelComponent,
    VoucherDescripcionComponent,
    PanelsVouchersComponent,
    VerImgComponent,
    DescriptionComponent,
    VerGaleriaComponent,
    TixEuroAnimalComponent,
    AlternativoComponent,
    CambiarHorarioComponent,
    MarketplaceComponent,
    ColorPickerComponent
  ],
  exports: [
    GaleriaStoreComponent,
    InfoLocalStoreComponent,
    MapaStoreComponent,
    VouchersStoreComponent,
    EventsStoreComponent,
    ComentsStoreComponent,
    StarsComentsComponent,
    DescriptionComponent,
    AlternativoComponent,
    MarketplaceComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicRatingModule,
    FormsModule,

    SharedModule
  ]
})
export class StoreComponentsModule { }
