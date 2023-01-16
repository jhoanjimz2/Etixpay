import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InEvidenzaComponent } from '../stores/components/in-evidenza/in-evidenza.component';
import { TopPrComponent } from '../stores/components/top-pr/top-pr.component';
import { NearbyStoresComponent } from './nearby-stores/nearby-stores.component';
import { StoreComponent } from '../stores/components/store/store.component';
import { CategoriesStoresComponent } from '../stores/components/categories-stores/categories-stores.component';
import { StarsValorationComponent } from './stars-valoration/stars-valoration.component';
import { WelcomeNewsShopsComponent } from './welcome-news-shops/welcome-news-shops.component';
import { SearchComponent } from '../stores/components/search/search.component';



@NgModule({
  declarations: [
    CategoriesStoresComponent,
    InEvidenzaComponent,
    TopPrComponent,
    StoreComponent,
    NearbyStoresComponent,
    StarsValorationComponent,
    WelcomeNewsShopsComponent,
    SearchComponent
  ],
  exports: [
    CategoriesStoresComponent,
    InEvidenzaComponent,
    TopPrComponent,
    StoreComponent,
    NearbyStoresComponent,
    StarsValorationComponent,
    WelcomeNewsShopsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class NegoziComponentsModule { }
