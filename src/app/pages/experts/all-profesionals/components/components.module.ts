import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesionalComponent } from './profesional/profesional.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StarsValorationComponent } from './stars-valoration/stars-valoration.component';



@NgModule({
  declarations: [
    ProfesionalComponent,
    SearchComponent,
    StarsValorationComponent
  ],
  exports: [
    ProfesionalComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule
  ]
})
export class ComponentsModule { }
