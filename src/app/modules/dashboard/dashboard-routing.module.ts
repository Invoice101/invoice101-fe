import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardBaseComponent} from './components/layout/dashboard-base/dashboard-base.component';
import {ListContactComponent} from './components/contact/list-contact/list-contact.component';
import {CreateContactComponent} from './components/contact/create-contact/create-contact.component';
import {ListProductsComponent} from './components/product/list-products/list-products.component';
import {ListInvoiceComponent} from './components/invoice/list-invoice/list-invoice.component';
import {CreateInvoiceComponent} from './components/invoice/create-invoice/create-invoice.component';
import {EditInvoiceComponent} from './components/invoice/edit-invoice/edit-invoice.component';
import {ViewInvoiceComponent} from './components/invoice/view-invoice/view-invoice.component';

const CONTACT_ROUTES: Routes = [
  {path: 'list', component: ListContactComponent},
  {path: 'create', component: CreateContactComponent},
  {path: ':id/edit', component: CreateContactComponent},
];

const PRODUCT_ROUTES: Routes = [
  {path: 'list', component: ListProductsComponent}
];

const INVOICE_ROUTES: Routes = [
  {path: 'list', component: ListInvoiceComponent},
  {path: 'create', component: CreateInvoiceComponent},
  {path: ':id/edit', component: EditInvoiceComponent},
  {path: ':id/view', component: ViewInvoiceComponent},
];

const routes: Routes = [
  {
    path: '', component: DashboardBaseComponent, children: [
      {path: '', component: DashboardHomeComponent},
      {path: 'contact', children: CONTACT_ROUTES},
      {path: 'product', children: PRODUCT_ROUTES},
      {path: 'invoice', children: INVOICE_ROUTES},
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
