import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {SessionService} from '../../../../services/session.service';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;

  loginForm: FormGroup;
  loginError = {
    errorMessage: '',
    hasError: false
  };
  loggingIn = false;
  private returnUrl: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              public  afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.afAuth.signOut();

    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(255)]),
      password: this.fb.control('', [Validators.required])
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || null;
  }

  loginWithProvider(provider: 'google' | 'facebook') {
    this.loggingIn = true;
    if (provider === 'google') {
      this.sessionService.googleSignIn().then(() => {
        this.router.navigate(['/dashboard']);
        this.loggingIn = false;
      }, () => {
        this.loggingIn = false;
      });
    }
  }

  login() {
    this.loggingIn = true;
    this.loginError.hasError = false;
    const {email, password} = this.loginForm.value;

    this.afAuth.signInWithEmailAndPassword(email, password).then((response) => {
      this.router.navigate(['/dashboard']);
      this.loggingIn = false;
    }, (error) => {
      if (error.code === 'auth/user-not-found') {
        this.loginError.errorMessage = 'It looks like you have not signed up with us.';
      } else if (error.code === 'auth/wrong-password') {
        this.loginError.errorMessage = 'Invalid Password.';
      } else if (error.code === 'auth/too-many-requests') {
        this.loginError.errorMessage = 'Too many sign in attempts. Please try later.';
      } else if (error.code === 'user-disabled') {
        this.loginError.errorMessage = 'User has been disabled.';
      } else {
        this.loginError.errorMessage = 'Something went wrong. Try again later.';
      }
      this.loginError.hasError = true;
      this.loggingIn = false;
    });
  }
}
