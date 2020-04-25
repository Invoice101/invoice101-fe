import {Component, OnInit} from '@angular/core';
import {UserInterface} from '../../../../interfaces/user.interface';
import {SessionService} from '../../../../services/session.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
