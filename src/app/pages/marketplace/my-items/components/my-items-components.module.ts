import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CardItemComponent } from './card-item/card-item.component';


@NgModule({
  declarations: [
    CardItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    CardItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyItemsComponentsModule { }
