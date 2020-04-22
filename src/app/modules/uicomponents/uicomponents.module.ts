import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './components/loading/loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProfileIconComponent} from './components/profile-icon/profile-icon.component';


@NgModule({
  declarations: [
    LoadingComponent,
    ProfileIconComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingComponent,
    ProfileIconComponent
  ]
})
export class UiComponentsModule {
}
