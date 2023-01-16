import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckYourEmailPage } from './check-your-email.page';

const routes: Routes = [
  {
    path: '',
    component: CheckYourEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckYourEmailPageRoutingModule {}
