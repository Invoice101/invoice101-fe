import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileBaseComponent} from './components/profile-base/profile-base.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '', component: ProfileBaseComponent, children: [
      {path: 'edit', component: EditProfileComponent},
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
export class ProfileRoutingModule {
}
