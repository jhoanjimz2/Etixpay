import { Routes } from "@angular/router";


export const ajustesRoutes: Routes = [
    {
      path: 'personal-information',
      loadChildren: () => import('./components/personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
    },
    {
      path: 'security',
      loadChildren: () => import('./components/security/security.module').then( m => m.SecurityPageModule)
    },
    {
      path: 'change-password',
      loadChildren: () => import('./components/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
    },
    {
      path: 'payment-methods',
      loadChildren: () => import('./components/payment-methods/payment-methods.module').then( m => m.PaymentMethodsPageModule)
    }
];