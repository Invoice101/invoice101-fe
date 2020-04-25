import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {UiComponentsModule} from '../uicomponents/uicomponents.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    UiComponentsModule,
    NgbDropdownModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {
}
