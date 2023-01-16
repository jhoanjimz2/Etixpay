import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingOnlineComponentComponent } from './shopping-online-component/shopping-online-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InEvidenzaComponent } from './in-evidenza/in-evidenza.component';
import { TopPrComponent } from './top-pr/top-pr.component';
import { CategoriesShoppingComponent } from './categories-shopping/categories-shopping.component';
import { ShopComponent } from './shop/shop.component';
import { SearchComponent } from './search/search.component';
import { EcommerceHomeComponent } from './ecommerce-home/ecommerce-home.component';



@NgModule({
  declarations: [
    EcommerceHomeComponent,
    ShoppingOnlineComponentComponent,
    InEvidenzaComponent,
    TopPrComponent,
    CategoriesShoppingComponent,
    ShopComponent,
    SearchComponent
  ],
  exports: [
    EcommerceHomeComponent,
    ShoppingOnlineComponentComponent,
    InEvidenzaComponent,
    TopPrComponent,
    CategoriesShoppingComponent,
    ShopComponent,
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
export class EcommerceComponentsModule { }
