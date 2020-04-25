import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../../../../../services/state.service';
import {SessionService} from '../../../../../services/session.service';
import {UserInterface} from '../../../../../interfaces/user.interface';
import {StateInterface} from '../../../../../interfaces/state.interface';
import {faPlusSquare as farPlusSquare, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import {ContactService} from '../../../../../services/contact.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  initialLoading: boolean;
  states: StateInterface[];
  contactForm: FormGroup;
  farPlusSquare = farPlusSquare;
  faTimes = faTimes;
  isCreating: boolean;

  private user: UserInterface;

  constructor(private location: Location,
              private contactService: ContactService,
              private sessionService: SessionService,
              private fb: FormBuilder,
              private toast: ToastrService,
              private stateService: StateService) {
  }

  ngOnInit(): void {
    this.initialLoading = true;
    this.user = this.sessionService.user;

    this.stateService.getStates().subscribe(response => {
      this.states = response;
      this.initialLoading = false;
    });
    this.buildForm();
  }

  cancel() {
    this.location.back();
  }

  createContact() {
    const postObj = this.contactForm.getRawValue();

    this.isCreating = true;
    this.contactService.createContact(postObj).subscribe(() => {
      this.isCreating = false;
      this.toast.success('Contact Created');
      this.location.back();
    }, () => {
      this.isCreating = false;
      this.toast.success('Oops! Something went wrong.');
    });
  }

  stateSearch(term: string, state: StateInterface) {
    return state.name.toLowerCase().startsWith(term.toLowerCase());
  }

  private buildForm() {
    this.contactForm = this.fb.group({
      owner: this.fb.control(this.user.id, Validators.required),
      name: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
      email: this.fb.control('', [Validators.required, Validators.maxLength(254), Validators.email]),

      company: this.fb.control('', Validators.maxLength(255)),
      is_customer: this.fb.control(true, Validators.maxLength(50)),
      is_supplier: this.fb.control(false, Validators.maxLength(50)),
      mobile_no: this.fb.control('', [Validators.maxLength(15), Validators.pattern('^[0-9]{0,15}$')]),

      gstin: this.fb.control('', [Validators.maxLength(15), Validators.pattern('^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z][a-zA-Z0-9][zZ][a-zA-Z0-9]$')]),
      billing_address_line_1: this.fb.control('', Validators.maxLength(511)),
      billing_address_line_2: this.fb.control('', Validators.maxLength(511)),
      billing_city: this.fb.control('', Validators.maxLength(100)),
      billing_state: this.fb.control('', [Validators.required]),
      billing_pin_code: this.fb.control('', [Validators.pattern('^[0-9]{6}$')]),

      shipping_address_line_1: this.fb.control('', Validators.maxLength(511)),
      shipping_address_line_2: this.fb.control('', Validators.maxLength(511)),
      shipping_city: this.fb.control('', Validators.maxLength(100)),
      shipping_state: this.fb.control(''),
      shipping_pin_code: this.fb.control('', [Validators.pattern('^[0-9]{6}$')]),
    });
  }
}
