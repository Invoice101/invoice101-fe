import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileBaseComponent} from './components/profile-base/profile-base.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ProfileBaseComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  exports: [
    ProfileRoutingModule
  ]
})
export class ProfileModule {
}
