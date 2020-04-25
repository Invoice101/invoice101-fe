import {Component, OnInit} from '@angular/core';
import {faAddressBook, faDollarSign, faFilePdf} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  faAddressBook = faAddressBook;
  faFilePdf = faFilePdf;
  faDollarSign = faDollarSign;

  constructor() {
  }

  ngOnInit(): void {
  }

}
