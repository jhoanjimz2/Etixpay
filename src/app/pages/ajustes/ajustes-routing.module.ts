import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ajustesRoutes } from './ajustes.routes';

const routes: Routes = [
  {
    path: '',
    children: ajustesRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesPageRoutingModule {}
