import {Component, OnInit} from '@angular/core';
import {
  faEdit,
  faPlusSquare as farPlusSquare,
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
} from '@fortawesome/free-solid-svg-icons';
import {ProductInterface} from '../../../../../interfaces/product.interface';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../../../../services/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateProductComponent} from '../create-product/create-product.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  farPlusSquare = farPlusSquare;
  faSearch = faSearch;
  faEdit = faEdit;

  searchText: string;
  sortContext: { name: string, icon: IconDefinition, value: string };
  isLoading: boolean;
  products: ProductInterface[] = [];

  sortValues = [
    {name: 'Name', icon: faSortAlphaUp, value: 'name'},
    {name: 'Name', icon: faSortAlphaDown, value: '-name'},
    {name: 'Price', icon: faSortAmountUp, value: 'price'},
    {name: 'Price', icon: faSortAmountDown, value: '-price'},
  ];

  paginationHelper = {
    currentPage: 1,
    pageSize: 10,
    totalSize: 0
  };

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private modal: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.fetchProducts(null, queryParamMap);
    });
  }

  changeQueryParam(paramType: 'search' | 'sort' | 'page', paramValue: string | number) {
    const queryParams = {
      page: this.paginationHelper.pageSize,
      sort: this.sortContext.value,
      search: this.searchText
    };

    switch (paramType) {
      case 'page':
        queryParams.page = paramValue as number;
        break;
      case 'search':
        queryParams.page = 1;
        queryParams.search = paramValue as string;
        break;
      case 'sort':
        queryParams.page = 1;
        queryParams.sort = paramValue as string;
        break;
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams
    });
  }

  createProduct() {
    const modal = this.modal.open(CreateProductComponent);
    modal.result.then((product) => {
      console.log(product);
    }, () => {
    });
  }

  openEdit(product: ProductInterface) {
    const modal = this.modal.open(CreateProductComponent);
    modal.componentInstance.mode = 'edit';
    modal.componentInstance.product = product;
    modal.result.then((modifiedProduct: ProductInterface) => {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index > -1) {
        this.products.splice(index, 1, modifiedProduct);
      }
    }, () => {
    });
  }

  private fetchProducts(link: string, queryParamMap?: ParamMap) {
    this.isLoading = true;
    let params = new HttpParams().set('page_size', this.paginationHelper.pageSize.toString());

    if (queryParamMap.has('search')) {
      this.searchText = queryParamMap.get('search');
      params = params.set('search', this.searchText);
    }

    if (queryParamMap.has('page')) {
      this.paginationHelper.currentPage = Number(queryParamMap.get('page'));
      params = params.set('page', this.paginationHelper.currentPage.toString());
    }

    if (queryParamMap.has('sort')) {
      const sortString = queryParamMap.get('sort');
      this.sortContext = this.sortValues.find(sv => sv.value === sortString);
    }
    this.sortContext = this.sortContext || this.sortValues[0];
    params = params.set('ordering', this.sortContext.value);

    this.productService.getProducts(params, link)
      .subscribe(response => {
        this.products = response.results;
        this.paginationHelper.totalSize = response.count;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }
}
