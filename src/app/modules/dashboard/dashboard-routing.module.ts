import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardBaseComponent} from './components/layout/dashboard-base/dashboard-base.component';

const routes: Routes = [
  {
    path: '', component: DashboardBaseComponent, children: [
      {path: '', component: DashboardHomeComponent}
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
