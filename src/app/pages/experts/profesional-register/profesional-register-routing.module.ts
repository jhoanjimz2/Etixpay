import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalRegisterPage } from './profesional-register.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalRegisterPageRoutingModule {}
