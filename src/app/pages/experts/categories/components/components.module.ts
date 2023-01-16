import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriaComponent } from './categoria/categoria.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    CategoriaComponent,
    SearchComponent
  ],
  exports: [
    CategoriaComponent,
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
