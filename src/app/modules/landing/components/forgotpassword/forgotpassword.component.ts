import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  forgotPasswordError = {
    errorMessage: '',
    hasError: false
  };
  submitting = false;

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      
    });
  }

  submit() {
   
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
