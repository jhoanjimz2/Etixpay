import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProfesionalsPage } from './all-profesionals.page';

const routes: Routes = [
  {
    path: '',
    component: AllProfesionalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProfesionalsPageRoutingModule {}
