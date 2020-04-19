/**
 * Created by karthik on 18/9/17.
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {
    }, (error) => {
      if (error.status === 401 && window.location.href.indexOf('login') === -1) {
        this.authService.clearCredentials();
        window.location.reload();
      }
    }));
  }
}
