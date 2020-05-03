import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../../services/product.service';
import {SessionService} from '../../../../../services/session.service';
import {ExtraService} from '../../../../../services/extra.service';
import {UOMInterface} from '../../../../../interfaces/extra.interface';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private fb: FormBuilder,
              private sessionService: SessionService,
              private extraService: ExtraService,
              private toast: ToastrService,
              private activeModal: NgbActiveModal,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.buildForm();

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
    console.log(postObj);

    this.productService.createProducts(postObj).subscribe(response => {
      this.toast.success('Product created');
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
      user: [this.sessionService.user.id],
      name: this.fb.control('', [Validators.required, Validators.maxLength(500)]),
      description: this.fb.control('', [Validators.maxLength(2000)]),
      hsn_sac: this.fb.control('', [Validators.maxLength(30)]),
      tax_percentage: this.fb.control(0, [Validators.maxLength(30), Validators.max(100), Validators.min(0)]),
      price: this.fb.control(null, [Validators.required, Validators.max(1000000000), Validators.min(0)]),
      uom: this.fb.control(null, Validators.required),
    });
  }
}
