import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerService} from '../../../../../services/customer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../../../../../services/state.service';
import {SessionService} from '../../../../../services/session.service';
import {UserInterface} from '../../../../../interfaces/user.interface';
import {StateInterface} from '../../../../../interfaces/state.interface';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  initialLoading: boolean;
  states: StateInterface[];
  customerForm: FormGroup;
  faTimes = faTimes;
  isCreating: boolean;

  private user: UserInterface;

  constructor(private modal: NgbActiveModal,
              private customerService: CustomerService,
              private sessionService: SessionService,
              private fb: FormBuilder,
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
    this.modal.dismiss();
  }

  createCustomer() {
    const postObj = this.customerForm.getRawValue();

    this.isCreating = true;
    this.customerService.createCustomer(postObj).subscribe(response => {
      this.isCreating = false;
      // TODO: Show Toast Success
      this.modal.close(response);
    }, () => {
      this.isCreating = false;
      // TODO: Show Toast Error
    });
  }

  stateSearch(term: string, state: StateInterface) {
    return state.name.toLowerCase().startsWith(term.toLowerCase());
  }

  private buildForm() {
    this.customerForm = this.fb.group({
      owner: this.fb.control(this.user.id, Validators.required),
      name: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
      email: this.fb.control('', [Validators.required, Validators.maxLength(254), Validators.email]),

      company: this.fb.control('', Validators.maxLength(255)),
      mobile_no: this.fb.control('', Validators.maxLength(15)),

      gstin: this.fb.control('', [Validators.maxLength(15), Validators.pattern('^\d{2}[a-zA-Z]{5}\d{4}[a-zA-Z][a-zA-Z\d][zZ][a-zA-Z\d]$')]),
      address_line_1: this.fb.control('', Validators.maxLength(511)),
      address_line_2: this.fb.control('', Validators.maxLength(511)),
      city: this.fb.control('', Validators.maxLength(100)),
      state: this.fb.control('', [Validators.required]),
      pin_code: this.fb.control('', [Validators.pattern('^\d{6}$')]),
    });
  }
}
