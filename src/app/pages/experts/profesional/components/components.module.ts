import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfoPrincipalComponent } from './info-principal/info-principal.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { InfoContactoComponent } from './info-contacto/info-contacto.component';
import { InfoExtraComponent } from './info-extra/info-extra.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { StarsComentsComponent } from './stars-coments/stars-coments.component';
import { ProfesionalVoucherComponent } from './profesional-voucher/profesional-voucher.component';
import { VerImgComponent } from './ver-img/ver-img.component';
import { PipesModule } from '../../../../pipes/pipes.module';
import { VerGaleriaComponent } from './ver-galeria/ver-galeria.component';
import { AddComentarioComponent } from './add-comentario/add-comentario.component';
import { IonicRatingModule } from 'ionic4-rating';
import { MapaComponent } from './mapa/mapa.component';
import { EditInfoPerfilComponent } from './edit-info-perfil/edit-info-perfil.component';



@NgModule({
  declarations: [
    InfoPrincipalComponent,
    GaleriaComponent,
    InfoContactoComponent,
    InfoExtraComponent,
    DescripcionComponent,
    ComentariosComponent,
    StarsComentsComponent,
    ProfesionalVoucherComponent,
    VerImgComponent,
    VerGaleriaComponent,
    AddComentarioComponent,
    MapaComponent,
    EditInfoPerfilComponent
  ],
  exports: [
    InfoPrincipalComponent,
    GaleriaComponent,
    InfoContactoComponent,
    InfoExtraComponent,
    DescripcionComponent,
    ComentariosComponent,
    ProfesionalVoucherComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule,
    IonicRatingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentsModule { }
