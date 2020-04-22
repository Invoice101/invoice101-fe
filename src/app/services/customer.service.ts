import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CUSTOMER_APIS} from '../constants/api.constants';
import {Observable} from 'rxjs';
import {CustomerInterface} from '../interfaces/customer.interface';
import {PaginatedResponseInterface} from '../interfaces/paginatedResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getCustomers(params: HttpParams, link?: string): Observable<PaginatedResponseInterface<CustomerInterface>> {
    if (link) {
      return this.httpClient.get<PaginatedResponseInterface<CustomerInterface>>(link);
    }
    return this.httpClient.get<PaginatedResponseInterface<CustomerInterface>>(CUSTOMER_APIS.customer, {params});
  }

  createCustomer(postObj: object): Observable<CustomerInterface> {
    return this.httpClient.post<CustomerInterface>(CUSTOMER_APIS.customer, postObj);
  }

  updateCustomer(patchObj: object): Observable<CustomerInterface> {
    return this.httpClient.patch<CustomerInterface>(CUSTOMER_APIS.customer, patchObj);
  }

  getCustomerById(id: number): Observable<CustomerInterface> {
    return this.httpClient.get<CustomerInterface>(CUSTOMER_APIS.customer + id.toString() + '/');
  }
}
