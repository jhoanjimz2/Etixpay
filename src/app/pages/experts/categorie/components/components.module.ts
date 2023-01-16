import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ServicioComponent } from './servicio/servicio.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ServicioComponent,
    SearchComponent
  ],
  exports: [
    ServicioComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule
  ]
})
export class ComponentsModule { }
