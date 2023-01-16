import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderButtonsComponent } from './header-buttons/header-buttons.component';
import { OverviewComponent } from './overview/overview.component';
import { MondalInfoComponent } from './mondal-info/mondal-info.component';
import { CommunityInComponent } from './community-in/community-in.component';
import { ModalShareComponent } from './modal-share/modal-share.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MovementsComponent } from './movements/movements.component';
import { RememberInfoComponent } from './remember-info/remember-info.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalInfoDevComponent } from './modal-info-dev/modal-info-dev.component';


@NgModule({
  declarations: [
    HeaderButtonsComponent,
    OverviewComponent,
    MondalInfoComponent,
    CommunityInComponent,
    ModalShareComponent,
    TutorialComponent,
    MovementsComponent,
    RememberInfoComponent,
    ModalInfoDevComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    HeaderButtonsComponent,
    OverviewComponent,
    MondalInfoComponent,
    CommunityInComponent,
    ModalShareComponent,
    TutorialComponent,
    MovementsComponent,
    RememberInfoComponent,
    ModalInfoDevComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommunityComponentsModule { }
