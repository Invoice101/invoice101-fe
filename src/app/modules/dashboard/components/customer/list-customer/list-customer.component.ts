import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../../../services/customer.service';
import {CustomerInterface} from '../../../../../interfaces/customer.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateCustomerComponent} from '../create-customer/create-customer.component';
import {faPlusSquare as farPlusSquare} from '@fortawesome/free-regular-svg-icons';

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
  farPlusSquare = farPlusSquare;

  constructor(private customerService: CustomerService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.fetchCustomers(null);
  }

  createCustomer() {
    const modal = this.modalService.open(CreateCustomerComponent);
    modal.result.then(response => {
      this.customers.push(response);
    }, () => {
    });
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
