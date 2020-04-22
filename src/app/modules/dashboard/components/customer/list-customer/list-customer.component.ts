import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../../services/customer.service';
import {CustomerInterface} from '../../../../../interfaces/customer.interface';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  isLoading: boolean;

  customers: CustomerInterface[];
  nextUrl: string;
  previousUrl: string;
  count: number;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.fetchCustomers(null);
  }

  private fetchCustomers(link: string) {
    this.isLoading = true;

    this.customerService.getCustomers(null, link).subscribe(response => {
      this.isLoading = false;
      this.customers = response.results;
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
      this.count = response.count;
    }, () => {
      this.isLoading = false;
    });
  }
}
