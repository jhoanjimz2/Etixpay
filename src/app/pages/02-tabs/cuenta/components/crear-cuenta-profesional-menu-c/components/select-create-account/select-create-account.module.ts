import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCreateAccountPageRoutingModule } from './select-create-account-routing.module';

import { SelectCreateAccountPage } from './select-create-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCreateAccountPageRoutingModule
  ],
  declarations: [SelectCreateAccountPage]
})
export class SelectCreateAccountPageModule {}
