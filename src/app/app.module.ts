import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ResponseInterceptor} from './services/httpInterceptors/ResponseInterceptor';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';


const firebaseConfig = {
  apiKey: 'AIzaSyCNNEfgrvTu1TV3djIDxttgGhAI1BaVUzQ',
  authDomain: 'invoice101-f98b1.firebaseapp.com',
  databaseURL: 'https://invoice101-f98b1.firebaseio.com',
  projectId: 'invoice101-f98b1',
  storageBucket: 'invoice101-f98b1.appspot.com',
  messagingSenderId: '473282113607',
  appId: '1:473282113607:web:c0eaeaf99dea477a540162',
  measurementId: 'G-ZZ83652KV0'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    NgBootstrapFormValidationModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
