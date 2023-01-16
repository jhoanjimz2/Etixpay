import { Routes } from "@angular/router";

export const pagosRoutes: Routes = [
    {
      path: 'ticket',
      loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)
    },
    {
      path: 'cash',
      loadChildren: () => import('./cash/cash.module').then( m => m.CashPageModule)
    },
    {
      path: 'pay',
      loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
    }
];

