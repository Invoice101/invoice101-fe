import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {USER_APIS} from '../constants/api.constants';
import {AuthTokenInterface} from '../interfaces/authToken.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<AuthTokenInterface> {
    return this.httpClient.post<AuthTokenInterface>(USER_APIS.login, {username, password});
  }
}
