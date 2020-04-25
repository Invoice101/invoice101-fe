import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardBaseComponent} from './components/layout/dashboard-base/dashboard-base.component';
import {DashboardHeaderComponent} from './components/layout/dashboard-header/dashboard-header.component';
import {DashboardSidebarComponent} from './components/layout/dashboard-sidebar/dashboard-sidebar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule, NgbModalModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {UiComponentsModule} from '../uicomponents/uicomponents.module';
import {CreateContactComponent} from './components/contact/create-contact/create-contact.component';
import {ListContactComponent} from './components/contact/list-contact/list-contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {ContactTileComponent} from './components/contact/customer-tile/contact-tile.component';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardBaseComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent,
    CreateContactComponent,
    ListContactComponent,
    ContactTileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    NgSelectModule,
    NgBootstrapFormValidationModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    NgbPopoverModule,
    UiComponentsModule,
    NgbDropdownModule,
    NgbModalModule
  ]
})
export class DashboardModule {
}
