import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingModule} from './modules/landing/landing.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {AuthGuard} from './services/routerGuards/auth-guard.service';
import {ProfileModule} from './modules/profile/profile.module';

const routes: Routes = [
  {path: '', loadChildren: () => LandingModule},
  {path: 'dashboard', loadChildren: () => DashboardModule, canActivate: [AuthGuard]},
  {path: 'profile', loadChildren: () => ProfileModule, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 115]
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
