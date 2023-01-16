import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalPage } from './profesional.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalPageRoutingModule {}
