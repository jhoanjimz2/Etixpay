import { Routes } from "@angular/router";


export const inversionesRoutes: Routes = [
    {
      path: 'local-invest',
      loadChildren: () => import('./local-invest/local-invest.module').then( m => m.LocalInvestPageModule)
    },
    {
      path: 'buy-invest',
      loadChildren: () => import('./components/buy-invest/buy-invest.module').then( m => m.BuyInvestPageModule)
    },
    {
      path: 'simulacion',
      loadChildren: () => import('./components/simulacion/simulacion.module').then( m => m.SimulacionPageModule)
    }
];

