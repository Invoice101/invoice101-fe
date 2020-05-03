import {Component, OnInit} from '@angular/core';
import {ContactInterface} from '../../../../../interfaces/contact.interface';
import {faFilter, faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';
import {ContactService} from '../../../../../services/contact.service';
import {HttpParams} from '@angular/common/http';

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

  faPlusSquare = faPlusSquare;
  faFilter = faFilter;
  faSearch = faSearch;

  searchText = '';

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.fetchContacts(null);
  }

  fetchContacts(link: string) {
    this.isLoading = true;

    let params = new HttpParams().set('page_size', '15');
    if (this.searchText) {
      params = params.set('search', this.searchText);
    }

    this.contactService.getContacts(params, link).subscribe(response => {
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
