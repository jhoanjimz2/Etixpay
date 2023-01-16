import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtixWinPage } from './etix-win.page';

const routes: Routes = [
  {
    path: '',
    component: EtixWinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtixWinPageRoutingModule {}
