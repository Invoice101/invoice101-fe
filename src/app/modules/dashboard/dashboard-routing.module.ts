import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardBaseComponent} from './components/layout/dashboard-base/dashboard-base.component';
import {ListCustomerComponent} from './components/customer/list-customer/list-customer.component';
import {CreateCustomerComponent} from './components/customer/create-customer/create-customer.component';

const routes: Routes = [
  {
    path: '', component: DashboardBaseComponent, children: [
      {path: '', component: DashboardHomeComponent}
    ]
  },
  {
    path: 'customer/', children: [
      {path: 'list/', component: ListCustomerComponent},
      {path: 'create/', component: CreateCustomerComponent},
    ]
  }
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
