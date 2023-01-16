import { Routes } from "@angular/router";

export const mapaRoutes: Routes = [
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'filtros',
    loadChildren: () => import('./filtros/filtros.module').then( m => m.FiltrosPageModule)
  }
];

