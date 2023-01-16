import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { TopExpertsComponent } from './top-experts/top-experts.component';
import { ServicesPopularComponent } from './services-popular/services-popular.component';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { StarsValorationComponent } from './stars-valoration/stars-valoration.component';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CategoriesComponent,
    TopExpertsComponent,
    ServicesPopularComponent,
    SearchComponent,
    StarsValorationComponent
  ],
  exports: [
    CategoriesComponent,
    TopExpertsComponent,
    ServicesPopularComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    TranslateModule
  ]
})
export class ComponentsModule { }
