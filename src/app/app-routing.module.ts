import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingModule} from './modules/landing/landing.module';


const routes: Routes = [
  {path: '', loadChildren: () => LandingModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollOffset: [0, 115]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
