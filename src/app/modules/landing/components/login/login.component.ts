import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication.service';

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
    this.authenticationService.login(username, password).subscribe(response => {
      this.loggingIn = false;
      console.log(response);
    }, errorResponse => {
      this.loggingIn = false;
      this.loginError.hasError = true;
      this.loginError.errorMessage = errorResponse.error.detail;
    });
  }
}
