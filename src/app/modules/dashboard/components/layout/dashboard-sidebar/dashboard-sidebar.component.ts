import {Component, OnInit} from '@angular/core';
import {faAddressBook, faDollarSign, faFilePdf, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../../../../services/session.service';
import {UserInterface} from '../../../../../interfaces/user.interface';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  faAddressBook = faAddressBook;
  faFilePdf = faFilePdf;
  faDollarSign = faDollarSign;
  faShoppingBag = faShoppingBag;

  user: UserInterface;

  constructor(private sessionService: SessionService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
  }

  logout() {
    this.authenticationService.clearCredentials();
    this.router.navigate(['/login']);
  }

}
