import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authRoutes } from './auth.routes';

const routes: Routes = [
  {
    path: '',
    children: authRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
