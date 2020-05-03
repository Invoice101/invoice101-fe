import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardBaseComponent} from './components/layout/dashboard-base/dashboard-base.component';
import {ListContactComponent} from './components/contact/list-contact/list-contact.component';
import {CreateContactComponent} from './components/contact/create-contact/create-contact.component';
import {ListProductsComponent} from './components/product/list-products/list-products.component';

const CONTACT_ROUTES: Routes = [
  {path: 'list', component: ListContactComponent},
  {path: 'create', component: CreateContactComponent},
  {path: ':id/edit', component: CreateContactComponent},
];

const PRODUCT_ROUTES: Routes = [
  {path: 'list', component: ListProductsComponent}
];

const routes: Routes = [
  {
    path: '', component: DashboardBaseComponent, children: [
      {path: '', component: DashboardHomeComponent},
      {path: 'contact', children: CONTACT_ROUTES},
      {path: 'product', children: PRODUCT_ROUTES},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
