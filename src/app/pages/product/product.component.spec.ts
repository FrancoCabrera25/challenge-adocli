import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductService } from '../../shared/services/product/product.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { of } from 'rxjs';
import { Product } from '../../shared/interface/product.interface';
import { By } from '@angular/platform-browser';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductTableComponent } from './components/product-table/product-table.component';
const PRODUCT_LIST_MOCK: Product[] = [
  {
    id: 1,
    title: 'jallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    description: '',
    category: "men's clothing",
    price: 109.95,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },

  {
    id: 1,
    title: 'jallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    description: '',
    category: "men's clothing",
    price: 109.95,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];
describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let service: ProductService;
  let authService: AuthService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ProductComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [ProductService],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(ProductService);
    authService = fixture.debugElement.injector.get(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on ngOnInit', () => {
    const productsSpy = spyOn(service, 'getProducts').and.returnValue(
      of(PRODUCT_LIST_MOCK)
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(productsSpy).toHaveBeenCalled();
    expect(component.productList.length).toBe(2);
  });

  it('should call loadProducts with filters on handleChangeFilters', () => {
    const productsSpy = spyOn(component, 'loadProducts').and.callThrough();
    const handleChangeFiltersSpy = spyOn(component, 'handleChangeFilters').and.callThrough();
    const componentchild = fixture.debugElement.query(
      By.directive(ProductFilterComponent)
    );
    fixture.detectChanges();
    componentchild.componentInstance.filterSelected.emit({
      category: 'all',
      limit: 10,
    });

    fixture.detectChanges();

    expect(handleChangeFiltersSpy).toHaveBeenCalledWith({ category: 'all', limit: 10 });
    expect(productsSpy).toHaveBeenCalled();
  });

  it('should call productService.showModalDetail on showDetail', () => {
    const productsSpy = spyOn(service, 'showModalDetail').and.callThrough();
    const showDetailSpy = spyOn(component, 'showDetail').and.callThrough();
    const componentchild = fixture.debugElement.query(
      By.directive(ProductTableComponent)
    );
    fixture.detectChanges();
    componentchild.componentInstance.selectedProduct.emit(PRODUCT_LIST_MOCK[0]);

    fixture.detectChanges();

    expect(showDetailSpy).toHaveBeenCalledWith(PRODUCT_LIST_MOCK[0]);
    expect(productsSpy).toHaveBeenCalled();
  });

  it('should call authService.logout on logout', () => {
    const logoutSpy = spyOn(authService, 'logout');
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });
});
