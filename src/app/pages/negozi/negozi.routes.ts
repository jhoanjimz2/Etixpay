import { Routes } from "@angular/router";


export const negoziRoutes: Routes = [
    {
      path: 'stores',
      loadChildren: () => import('./stores/stores.module').then( m => m.StoresPageModule)
    },
    {
      path: 'store-page/:uuid',
      loadChildren: () => import('./store-page/store-page.module').then( m => m.StorePagePageModule)
    }
];

