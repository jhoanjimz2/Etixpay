import { Routes } from "@angular/router";

export const expertsRoutes: Routes = [
  {
    path: 'profesionals',
    loadChildren: () => import('./profesionals/profesionals.module').then( m => m.ProfesionalsPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categorie',
    loadChildren: () => import('./categorie/categorie.module').then( m => m.CategoriePageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'profesional',
    loadChildren: () => import('./profesional/profesional.module').then( m => m.ProfesionalPageModule)
  },
  {
    path: 'all-profesionals',
    loadChildren: () => import('./all-profesionals/all-profesionals.module').then( m => m.AllProfesionalsPageModule)
  },
  {
    path: 'register-profesional',
    loadChildren: () => import('./profesional-register/profesional-register.module').then( m => m.ProfesionalRegisterPageModule)
  }
];
