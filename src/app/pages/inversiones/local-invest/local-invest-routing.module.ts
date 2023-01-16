import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalInvestPage } from './local-invest.page';

const routes: Routes = [
  {
    path: '',
    component: LocalInvestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalInvestPageRoutingModule {}
