import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'comunidad',
        loadChildren: () => import('../community/community-routing.module').then( m => m.CommunityPageRoutingModule)
      },
      {
        path: 'cartera',
        loadChildren: () => import('../paginas-usuarios/cartera/cartera.module').then( m => m.CarteraPageModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule)
      },
      {
        path: 'marketplace',
        loadChildren: () => import('../marketplace/marketplace.module').then( m => m.MarketplacePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../ajustes/settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
