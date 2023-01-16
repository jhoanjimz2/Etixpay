import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCreateAccountPage } from './select-create-account.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCreateAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCreateAccountPageRoutingModule {}
