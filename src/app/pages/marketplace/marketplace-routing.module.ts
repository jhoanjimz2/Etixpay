import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marketplaceRoutes } from './marketplace.routes';



const routes: Routes = [
  {
    path: '',
    children: marketplaceRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplacePageRoutingModule {}
