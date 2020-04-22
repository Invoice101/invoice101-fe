import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = {
    errorMessage: '',
    hasError: false
  };
  loggingIn = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
      password: this.fb.control('', [Validators.required])
    });
  }

  login() {
    this.loggingIn = true;
    this.loginError.hasError = false;

    const {username, password} = this.loginForm.value;
    this.authenticationService.login(username, password)
      .pipe(delay(1000))
      .subscribe(response => {
        this.router.navigate(['/dashboard']);
        this.loggingIn = false;
      }, errorResponse => {
        this.loggingIn = false;
        this.loginError.hasError = true;
        this.loginError.errorMessage = errorResponse.error.detail;
      });
  }
}
