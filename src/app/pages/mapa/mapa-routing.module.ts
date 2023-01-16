import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mapaRoutes } from './mapa.routes';

const routes: Routes = [
  {
    path: '',
    children: mapaRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaPageRoutingModule {}
