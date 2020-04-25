import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {UiComponentsModule} from '../uicomponents/uicomponents.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {InputDebounceDirective} from './directives/input-debounce.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    InputDebounceDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiComponentsModule,
    NgbDropdownModule
  ],
  exports: [
    HeaderComponent,
    InputDebounceDirective
  ]
})
export class SharedModule {
}
