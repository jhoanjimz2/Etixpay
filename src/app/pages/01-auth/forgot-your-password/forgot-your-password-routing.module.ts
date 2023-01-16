import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotYourPasswordPage } from './forgot-your-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotYourPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotYourPasswordPageRoutingModule {}
