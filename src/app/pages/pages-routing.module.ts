import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routes';

const routes: Routes = [
  {
    path: '',
    children: pagesRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
