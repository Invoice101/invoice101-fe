import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StateInterface, UOMInterface} from '../interfaces/extra.interface';
import {CORE_APIS} from '../constants/api.constants';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  private readonly _getStates: Observable<StateInterface[]>;
  private readonly _getUOMs: Observable<UOMInterface[]>;

  constructor(private httpClient: HttpClient) {
    this._getStates = this.httpClient.get<StateInterface[]>(CORE_APIS.state).pipe(shareReplay());
    this._getUOMs = this.httpClient.get<UOMInterface[]>(CORE_APIS.uom).pipe(shareReplay());
  }

  getStates(): Observable<StateInterface[]> {
    return this._getStates;
  }

  getStateById(id: number): Observable<StateInterface> {
    return this.getStates().pipe(map(response => response.find(s => s.id === id)));
  }

  getUOMs(): Observable<UOMInterface[]> {
    return this._getUOMs;
  }

  getUOMByShortName(short_name: string): Observable<UOMInterface> {
    return this.getUOMs().pipe(map(response => response.find(s => s.short_name === short_name)));
  }
}
