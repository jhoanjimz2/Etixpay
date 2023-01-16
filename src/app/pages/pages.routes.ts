import { Routes } from "@angular/router";
import { LoginGuardGuard } from "../services/guards/login-guard.guard";

export const pagesRoutes: Routes = [
    {
      path: 'register-company',
      canLoad: [LoginGuardGuard],
      loadChildren: () => import('./register-company/register-company.module').then( m => m.RegisterCompanyPageModule)
    },
    {
      path: 'community',
      loadChildren: () => import('./community/community.module').then( m => m.CommunityPageModule)
    },
    {
      path: 'ecommerce',
      loadChildren: () => import('./ecommerce/ecommerce.module').then( m => m.EcommercePageModule)
    },
    {
      path: 'negozi',
      loadChildren: () => import('./negozi/negozi.module').then( m => m.NegoziPageModule)
    },
    {
      path: 'marketplace',
      loadChildren: () => import('./marketplace/marketplace.module').then( m => m.MarketplacePageModule)
    },
    {
      path: 'tutorial',
      loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
    },
    {
      path: 'etix-win',
      loadChildren: () => import('./etix-win/etix-win.module').then( m => m.EtixWinPageModule)
    },
    {
      path: 'mapa',
      loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
    },
    {
      path: 'experts',
      loadChildren: () => import('./experts/experts.module').then( m => m.ExpertsPageModule)
    },
    {
      path: 'invest',
      loadChildren: () => import('./inversiones/inversiones.module').then( m => m.InversionesPageModule)
    },
    {
      path: 'etixcash',
      loadChildren: () => import('./etixcash/etixcash.module').then( m => m.EtixcashPageModule)
    },
    {
      path: 'ayuda',
      loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
    },
    {
      path: 'ajustes',
      loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
    },
    {
      path: 'pagos',
      loadChildren: () => import('./pagos/pagos.module').then( m => m.PagosPageModule)
    },
    {
      path: 'select-create-account',
      loadChildren: () => import('./02-tabs/cuenta/components/crear-cuenta-profesional-menu-c/components/select-create-account/select-create-account.module').then( m => m.SelectCreateAccountPageModule)
    },
    { 
      path: '', redirectTo: '/login', pathMatch: 'full'
    }
];

