import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../../services/product.service';
import {SessionService} from '../../../../../services/session.service';
import {ExtraService} from '../../../../../services/extra.service';
import {UOMInterface} from '../../../../../interfaces/extra.interface';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductInterface} from '../../../../../interfaces/product.interface';
import {Observable} from 'rxjs';
import {UserInterface} from '../../../../../interfaces/user.interface';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  uoms: UOMInterface[];

  initialLoading: boolean;
  isCreating: boolean;

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() product: ProductInterface;

  private user: UserInterface;

  constructor(private fb: FormBuilder,
              private sessionService: SessionService,
              private extraService: ExtraService,
              private toast: ToastrService,
              private activeModal: NgbActiveModal,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.sessionService.user$.subscribe(response => {
      this.user = response;
    });

    this.extraService.getUOMs().subscribe(response => {
      this.uoms = response;
    });
  }

  cancel() {
    this.activeModal.dismiss();
  }

  createProduct() {
    this.isCreating = true;
    const postObj = this.productForm.getRawValue();

    let apiCall: Observable<ProductInterface>;
    const successMessage = `Product ${this.mode === 'create' ? 'created' : 'edited'}`;

    if (this.mode === 'create') {
      apiCall = this.productService.createProducts(postObj);
    } else {
      apiCall = this.productService.updateProduct(this.product.id, postObj);
    }
    apiCall.subscribe(response => {
      this.toast.success(successMessage);
      this.isCreating = false;
      this.activeModal.close(response);
    }, () => {
      this.toast.error('Something went wrong while creating the product/service');
      this.isCreating = false;
    });
  }

  uomSearch(term: string, uom: UOMInterface) {
    return uom.name.toLowerCase().startsWith(term.toLowerCase()) || uom.short_name.toLowerCase().startsWith(term.toLowerCase());
  }

  private buildForm() {
    this.productForm = this.fb.group({
      user: [this.user.uid],
      name: this.fb.control(this.product?.name || '', [Validators.required, Validators.maxLength(500)]),
      description: this.fb.control(this.product?.description || '', [Validators.maxLength(2000)]),
      hsn_sac: this.fb.control(this.product?.hsn_sac || '', [Validators.maxLength(30)]),
      tax_percentage: this.fb.control(this.product?.tax_percentage || 0,
        [Validators.maxLength(30), Validators.max(100), Validators.min(0)]),
      price: this.fb.control(this.product?.price || null, [Validators.required, Validators.max(1000000000), Validators.min(0)]),
      uom: this.fb.control(this.product?.uom || null, Validators.required),
    });
  }
}
