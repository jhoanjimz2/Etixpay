import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pagosRoutes } from './pagos.routes';


const routes: Routes = [
  {
    path: '',
    children: pagosRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
