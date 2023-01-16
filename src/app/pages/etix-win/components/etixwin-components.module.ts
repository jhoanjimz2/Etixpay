import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PanoramicaComponent } from './panoramica/panoramica.component';
import { HistoryComponent } from './history/history.component';
import { PaginacionHistoryComponent } from './paginacion-history/paginacion-history.component';
import { PipesModule } from '../../../pipes/pipes.module';



@NgModule({
  declarations: [
    PanoramicaComponent,
    HistoryComponent,
    PaginacionHistoryComponent
  ],
  exports: [
    PanoramicaComponent,
    HistoryComponent,
    PaginacionHistoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ]
})
export class EtixwinComponentsModule { }
