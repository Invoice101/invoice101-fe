import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';

const routes = [
  {path: '', component: DashboardHomeComponent}
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
