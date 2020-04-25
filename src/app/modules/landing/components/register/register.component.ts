import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  signInError = {
    errorMessage: '',
    hasError: false
  };
  signingIn = false;

  constructor(private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
      password: this.fb.control('', [Validators.required])
    });
  }

  register() {
    this.signingIn = true;
    this.signInError.hasError = false;

    // const {username, password} = this.loginForm.value;
    // this.authenticationService.login(username, password).subscribe(response => {
    //   this.loggingIn = false;
    //   this.router.navigate(['/dashboard']);
    // }, errorResponse => {
    //   this.loggingIn = false;
    //   this.loginError.hasError = true;
    //   this.loginError.errorMessage = errorResponse.error.detail;
    // });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
