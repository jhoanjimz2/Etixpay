import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CrearCuentaProfesionalMenuCComponent } from '../crear-cuenta-profesional-menu-c.component';



@NgModule({
  declarations: [
    CrearCuentaProfesionalMenuCComponent
  ],
  exports: [
    CrearCuentaProfesionalMenuCComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class ModuloCrearCuentaProfesionalModule { }
