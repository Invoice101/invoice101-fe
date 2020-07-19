import {Component, OnInit} from '@angular/core';
import {UserInterface} from '../../../../interfaces/user.interface';
import {SessionService} from '../../../../services/session.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: Observable<UserInterface>;

  constructor(private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user$;
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

}
