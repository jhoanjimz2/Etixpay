import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { inversionesRoutes } from './inversiones.routes';


const routes: Routes = [
  {
    path: '',
    children: inversionesRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InversionesPageRoutingModule {}
