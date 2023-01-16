import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideClasificactionComponent } from './slide-clasificaction/slide-clasificaction.component';
import { CardItemComponent } from './card-item/card-item.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SlideClasificactionComponent,
    CardItemComponent,
  ],
  exports: [
    SlideClasificactionComponent,
    CardItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
