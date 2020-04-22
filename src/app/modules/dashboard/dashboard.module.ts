import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardBaseComponent } from './components/layout/dashboard-base/dashboard-base.component';
import { DashboardHeaderComponent } from './components/layout/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/layout/dashboard-sidebar/dashboard-sidebar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {UiComponentsModule} from '../uicomponents/uicomponents.module';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardBaseComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    CreateCustomerComponent,
    ListCustomerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    NgbPopoverModule,
    UiComponentsModule,
    NgbDropdownModule
  ]
})
export class DashboardModule {
}
