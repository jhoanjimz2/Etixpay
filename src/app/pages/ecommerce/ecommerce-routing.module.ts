import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcommercePage } from './ecommerce.page';

const routes: Routes = [
  {
    path: '',
    component: EcommercePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommercePageRoutingModule {}
