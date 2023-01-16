import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyInvestPage } from './buy-invest.page';

const routes: Routes = [
  {
    path: '',
    component: BuyInvestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyInvestPageRoutingModule {}
