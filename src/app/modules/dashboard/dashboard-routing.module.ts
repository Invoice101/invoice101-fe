import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardBaseComponent} from './components/layout/dashboard-base/dashboard-base.component';
import {ListContactComponent} from './components/contact/list-contact/list-contact.component';
import {CreateContactComponent} from './components/contact/create-contact/create-contact.component';

const CONTACT_ROUTES: Routes = [
  {path: 'list', component: ListContactComponent},
  {path: 'create', component: CreateContactComponent},
];

const routes: Routes = [
  {
    path: '', component: DashboardBaseComponent, children: [
      {path: '', component: DashboardHomeComponent},
      {path: 'contact', children: CONTACT_ROUTES}
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
