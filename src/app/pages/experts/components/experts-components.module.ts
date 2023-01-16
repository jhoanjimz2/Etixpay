import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NewExpertsComponent } from './new-experts/new-experts.component';



@NgModule({
  declarations: [
    NewExpertsComponent
  ],
  exports: [
    NewExpertsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ]
})
export class ExpertsComponentsModule { }
