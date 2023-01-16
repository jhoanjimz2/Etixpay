import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePagePage } from './store-page.page';

const routes: Routes = [
  {
    path: '',
    component: StorePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePagePageRoutingModule {}
