import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtixcashPage } from './etixcash.page';

const routes: Routes = [
  {
    path: '',
    component: EtixcashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtixcashPageRoutingModule {}
