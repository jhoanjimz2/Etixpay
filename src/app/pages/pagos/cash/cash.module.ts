import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CashPageRoutingModule } from "./cash-routing.module";

import { CashPage } from "./cash.page";
import { SharedModule } from "src/app/shared/shaerd.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashPageRoutingModule,
    SharedModule,
  ],
  declarations: [CashPage],
})
export class CashPageModule {}
