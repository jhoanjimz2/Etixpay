import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCompanyPageRoutingModule } from './register-company-routing.module';

import { RegisterCompanyPage } from './register-company.page';
import { TranslateModule } from '@ngx-translate/core';
import { RegCompanyComponentsModule } from './components/reg-company-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCompanyPageRoutingModule,
    TranslateModule,
    RegCompanyComponentsModule
  ],
  declarations: [RegisterCompanyPage]
})
export class RegisterCompanyPageModule {}
