import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {StateInterface} from '../interfaces/state.interface';
import {CORE_APIS} from '../constants/api.constants';
import {filter, map, share, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly _getStates: Observable<StateInterface[]>;

  constructor(private httpClient: HttpClient) {
    this._getStates = this.httpClient.get<StateInterface[]>(CORE_APIS.state).pipe(shareReplay());
  }

  getStates(): Observable<StateInterface[]> {
    return this._getStates;
  }

  getStateById(id: number): Observable<StateInterface> {
    return this.getStates().pipe(map(response => response.find(s => s.id === id)));
  }
}
