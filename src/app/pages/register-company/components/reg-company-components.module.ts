import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from './steps/steps.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DataFiscalRewardComponent } from './data-fiscal-reward/data-fiscal-reward.component';
import { DescriptionComponent } from './description/description.component';
import { SummaryComponent } from './summary/summary.component';
import { HeaderRegCompanyComponent } from './header-reg-company/header-reg-company.component';
import { CardAuthorizationComponent } from './card-authorization/card-authorization.component';
import { RegCompletedComponent } from './reg-completed/reg-completed.component';
import { MapRegCompanyComponent } from './map-reg-company/map-reg-company.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    HeaderRegCompanyComponent,
    StepsComponent,
    AuthorizationComponent,
    ContactDetailComponent,
    DataFiscalRewardComponent,
    DescriptionComponent,
    SummaryComponent,
    CardAuthorizationComponent,
    RegCompletedComponent,
    MapRegCompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GooglePlaceModule 
  ],
  exports: [
    CardAuthorizationComponent,
    StepsComponent,
    AuthorizationComponent,
    ContactDetailComponent,
    DataFiscalRewardComponent,
    DescriptionComponent,
    SummaryComponent,
    HeaderRegCompanyComponent,
    RegCompletedComponent,
    MapRegCompanyComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegCompanyComponentsModule { }
