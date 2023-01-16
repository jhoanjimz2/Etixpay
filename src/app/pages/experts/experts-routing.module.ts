import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { expertsRoutes } from './experts.routes';


const routes: Routes = [
  {
    path: '',
    children: expertsRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertsPageRoutingModule {}
