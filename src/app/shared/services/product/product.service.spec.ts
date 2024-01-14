import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  NgbModal,
  NgbModalModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from './product.service';
import { ProductDetailComponent } from '../../../pages/product/components/product-detail/product-detail.component';
import { Product } from '../../interface/product.interface';

const PRODUCT_MOCK: Product = {
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
};
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  //let modalService: jasmine.SpyObj<NgbModal>;
  let modalService: NgbModal;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModalModule],
      providers: [
        ProductService,
        // { provide: NgbModal, useValue: modalService },
      ],
    }).compileComponents();

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should get products for a given category', () => {
      const category = 'electronics';
      const limit = 10;
      const expectedProducts = [{ id: 1, name: 'Product 1', category }];

      service.getProducts(category, limit).subscribe((products) => {
        expect(products).toEqual(expectedProducts);
      });

      const req = httpMock.expectOne(
        `${service.baseUrl}/category/${category}?limit=${limit}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(expectedProducts);
    });

    it('should get all products if no category is specified', () => {
      const expectedProducts = [
        { id: 2, name: 'Product 2', category: 'jewelery' },
      ];

      service.getProducts().subscribe((products) => {
        expect(products).toEqual(expectedProducts);
      });

      const req = httpMock.expectOne(`${service.baseUrl}?limit=5`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedProducts);
    });
  });

  describe('getCategories', () => {
    it('should get categories', () => {
      const expectedCategories = ['electronics', 'jewelery'];

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(expectedCategories);
      });

      const req = httpMock.expectOne(`${service.baseUrl}/categories`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCategories);
    });
  });

  // describe('showModalDetail', () => {
  //  // const modalServiceOpenSpy = spyOn(modalService, 'open');
  //   //console.log('modalServiceOpenSpy', modalServiceOpenSpy);
  //   it('should open the modal with the product', () => {
  //     //service.showModalDetail(PRODUCT_MOCK);
  //     expect(modalService.open).toHaveBeenCalled();
  //     // const modalRef = modalService.open.calls.mostRecent().returnValue;
  //     // expect(modalRef.componentInstance.product).toBe(PRODUCT_MOCK);
  //   });
  // });
});
