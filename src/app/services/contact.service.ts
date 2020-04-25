import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CONTACT_APIS} from '../constants/api.constants';
import {Observable} from 'rxjs';
import {ContactInterface} from '../interfaces/contact.interface';
import {PaginatedResponseInterface} from '../interfaces/paginatedResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  getContacts(params?: HttpParams, link?: string): Observable<PaginatedResponseInterface<ContactInterface>> {
    if (link) {
      return this.httpClient.get<PaginatedResponseInterface<ContactInterface>>(link);
    }
    return this.httpClient.get<PaginatedResponseInterface<ContactInterface>>(CONTACT_APIS.contact, {params});
  }

  createContact(postObj: object): Observable<ContactInterface> {
    return this.httpClient.post<ContactInterface>(CONTACT_APIS.contact, postObj);
  }

  updateContact(patchObj: object): Observable<ContactInterface> {
    return this.httpClient.patch<ContactInterface>(CONTACT_APIS.contact, patchObj);
  }

  getContactById(id: number): Observable<ContactInterface> {
    return this.httpClient.get<ContactInterface>(CONTACT_APIS.contact + id.toString() + '/');
  }
}
