import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommunityPageRoutingModule } from './community-routing.module';
import { CommunityPage } from './community.page';
import { SharedModule } from '../../shared/shaerd.module';
import { CommunityComponentsModule } from './components/community-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityPageRoutingModule,
    SharedModule,
    CommunityComponentsModule,
    TranslateModule,
    PipesModule
  ],
  declarations: [CommunityPage]
})
export class CommunityPageModule {}

