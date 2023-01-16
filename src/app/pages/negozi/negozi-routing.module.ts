import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { negoziRoutes } from './negozi.routes';

const routes: Routes = [
  {
    path: '',
    children: negoziRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegoziPageRoutingModule {}
