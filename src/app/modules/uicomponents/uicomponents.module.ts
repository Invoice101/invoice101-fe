import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './components/loading/loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class UiComponentsModule {
}
