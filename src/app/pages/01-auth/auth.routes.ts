import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    },
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
    },
    {
      path: 'forgot-your-password',
      loadChildren: () => import('./forgot-your-password/forgot-your-password.module').then( m => m.ForgotYourPasswordPageModule)
    },
    {
      path: 'registrado',
      loadChildren: () => import('./registrado/registrado.module').then( m => m.RegistradoPageModule)
    },
    {
      path: 'check-your-email/:email',
      loadChildren: () => import('./check-your-email/check-your-email.module').then( m => m.CheckYourEmailPageModule)
    },
    {
      path: 'set-new-password/:email/:codigo',
      loadChildren: () => import('./set-new-password/set-new-password.module').then( m => m.SetNewPasswordPageModule)
    },
    {
      path: 'idioma-inicial',
      loadChildren: () => import('./idioma-inicial/idioma-inicial.module').then( m => m.IdiomaInicialPageModule)
    },
    { 
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];