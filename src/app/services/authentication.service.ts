import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {USER_APIS} from '../constants/api.constants';
import {AuthTokenInterface} from '../interfaces/authToken.interface';
import {concat, Observable} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {SessionService} from './session.service';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService) {
  }

  login(username: string, password: string): Observable<AuthTokenInterface> {
    return concat(
      this.httpClient.post<AuthTokenInterface>(USER_APIS.login, {username, password}).pipe(tap(response => {
        this.sessionService.token = response;
      }), delay(1000)),
      this.httpClient.get<UserInterface>(USER_APIS.user_profile).pipe(tap(response => {
        this.sessionService.user = response;
      }))
    ).pipe(map(responses => {
      return responses[0];
    }));

  }

  clearCredentials() {
    this.sessionService.clear();
  }
}
