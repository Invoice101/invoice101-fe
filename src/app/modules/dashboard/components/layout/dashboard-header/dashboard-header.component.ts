import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../../../services/session.service';
import {UserInterface} from '../../../../../interfaces/user.interface';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  user: UserInterface;

  constructor(private sessionService: SessionService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
  }

  logout() {
    this.authenticationService.clearCredentials();
    this.router.navigate(['/login']);
  }
}
