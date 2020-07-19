import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExtraService} from '../../../../../services/extra.service';
import {SessionService} from '../../../../../services/session.service';
import {UserInterface} from '../../../../../interfaces/user.interface';
import {StateInterface} from '../../../../../interfaces/extra.interface';
import {faEdit, faPlusSquare, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import {ContactService} from '../../../../../services/contact.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ContactInterface} from '../../../../../interfaces/contact.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  initialLoading: boolean;
  states: StateInterface[];
  contactForm: FormGroup;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faTimes = faTimes;
  isCreating: boolean;

  mode: 'create' | 'edit' = 'create';

  private user: UserInterface;
  private contact: ContactInterface;

  constructor(private location: Location,
              private contactService: ContactService,
              private sessionService: SessionService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private stateService: ExtraService) {
  }

  ngOnInit(): void {
    this.initialLoading = true;
    this.sessionService.user$.subscribe(response => {
      this.user = response;
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.mode = paramMap.has('id') ? 'edit' : 'create';

      if (this.mode === 'edit') {
        this.contactService.getContactById(paramMap.get('id')).subscribe(response => {
          this.contact = response;
          this.loadInitial();
        });
      } else {
        this.loadInitial();
      }
    });
  }

  loadInitial() {
    this.stateService.getStates().subscribe(response => {
      this.states = response;
      this.initialLoading = false;
      this.buildForm();
    });
  }

  cancel() {
    this.location.back();
  }

  createContact() {
    const postObj = this.contactForm.getRawValue();

    let apiCall: Observable<ContactInterface>;
    const successMessage = `Contact ${this.mode === 'create' ? 'created' : 'edited'}`;

    this.isCreating = true;
    if (this.mode === 'create') {
      apiCall = this.contactService.createContact(postObj);
    } else {
      apiCall = this.contactService.updateContact(this.contact.id, postObj);
    }

    apiCall.subscribe(() => {
      this.isCreating = false;
      this.toast.success(successMessage);
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
      owner: this.fb.control(this.user.uid, Validators.required),
      name: this.fb.control(this.contact?.name || '', [Validators.required, Validators.maxLength(255)]),
      email: this.fb.control(this.contact?.email || '', [Validators.required, Validators.maxLength(254), Validators.email]),

      company: this.fb.control(this.contact?.company || '', Validators.maxLength(255)),
      is_customer: this.fb.control(this.contact ? this.contact.is_customer : true, Validators.maxLength(50)),
      is_supplier: this.fb.control(this.contact?.is_supplier || false, Validators.maxLength(50)),
      mobile_no: this.fb.control(this.contact?.mobile_no || '', [Validators.maxLength(15), Validators.pattern('^[0-9]{0,15}$')]),

      gstin: this.fb.control(this.contact?.gstin || '', [Validators.maxLength(15), Validators.pattern('^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z][a-zA-Z0-9][zZ][a-zA-Z0-9]$')]),
      billing_address_line_1: this.fb.control(this.contact?.billing_address_line_1 || '', Validators.maxLength(511)),
      billing_address_line_2: this.fb.control(this.contact?.billing_address_line_2 || '', Validators.maxLength(511)),
      billing_city: this.fb.control(this.contact?.billing_city || '', Validators.maxLength(100)),
      billing_state: this.fb.control(this.contact?.billing_state || '', [Validators.required]),
      billing_pin_code: this.fb.control(this.contact?.billing_pin_code || '', [Validators.pattern('^[0-9]{6}$')]),

      shipping_address_line_1: this.fb.control(this.contact?.shipping_address_line_1 || '', Validators.maxLength(511)),
      shipping_address_line_2: this.fb.control(this.contact?.shipping_address_line_2 || '', Validators.maxLength(511)),
      shipping_city: this.fb.control(this.contact?.shipping_city || '', Validators.maxLength(100)),
      shipping_state: this.fb.control(this.contact?.shipping_state || ''),
      shipping_pin_code: this.fb.control(this.contact?.shipping_pin_code || '', [Validators.pattern('^[0-9]{6}$')]),
    });
  }
}
