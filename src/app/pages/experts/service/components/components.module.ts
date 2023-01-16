import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ProfesionalComponent } from './profesional/profesional.component';
import { StarsValorationComponent } from './stars-valoration/stars-valoration.component';



@NgModule({
  declarations: [
    SearchComponent,
    ProfesionalComponent,
    StarsValorationComponent
  ],
  exports: [
    SearchComponent,
    ProfesionalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule
  ]
})
export class ComponentsModule { }
