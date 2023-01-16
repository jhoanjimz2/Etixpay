import { Routes } from "@angular/router";


export const marketplaceRoutes: Routes = [
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'store/:search',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'item-detail/:id',
    loadChildren: () => import('./item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'add-item',
    loadChildren: () => import('./add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'my-items',
    loadChildren: () => import('./my-items/my-items.module').then( m => m.MyItemsPageModule)
  },
  {
    path: 'item-form/:id',
    loadChildren: () => import('./item-form/item-form.module').then( m => m.ItemFormPageModule)
  },
  {
    path: 'item-edit/:id',
    loadChildren: () => import('./item-edit/item-edit.module').then( m => m.ItemEditPageModule)
  },
  {
    path: 'form-contact/:id',
    loadChildren: () => import('./form-contact/form-contact.module').then( m => m.FormContactPageModule)
  },
];