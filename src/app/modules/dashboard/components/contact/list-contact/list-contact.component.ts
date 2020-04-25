import {Component, OnInit} from '@angular/core';
import {ContactInterface} from '../../../../../interfaces/contact.interface';
import {faPlusSquare as farPlusSquare} from '@fortawesome/free-regular-svg-icons';
import {faFilter, faSearch} from '@fortawesome/free-solid-svg-icons';
import {ContactService} from '../../../../../services/contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent implements OnInit {
  isLoading: boolean;

  contacts: ContactInterface[];
  nextUrl: string;
  previousUrl: string;
  count: number;

  farPlusSquare = farPlusSquare;
  faFilter = faFilter;
  faSearch = faSearch;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.fetchContacts(null);
  }

  private fetchContacts(link: string) {
    this.isLoading = true;

    this.contactService.getContacts(null, link).subscribe(response => {
      this.isLoading = false;
      this.contacts = response.results;
      this.nextUrl = response.next;
      this.previousUrl = response.previous;
      this.count = response.count;
    }, () => {
      this.isLoading = false;
    });
  }
}
