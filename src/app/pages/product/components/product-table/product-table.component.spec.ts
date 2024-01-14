import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from '../../../../shared/interface/product.interface';
import { ProductTableComponent } from './product-table.component';
import { By } from '@angular/platform-browser';
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
describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductTableComponent,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    component.productList = PRODUCT_LIST_MOCK;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectedProduct event when a row is selected', () => {
    const handleSelectedRowSpy = spyOn(component, 'handleSelectedRow').and.callThrough();
    const selectedProductSpy = spyOn(component.selectedProduct, 'emit');
    const selector = fixture.debugElement.query(By.css('[data-testid="row-selected"]'));
    selector.nativeElement.click(PRODUCT_LIST_MOCK[0]);
    fixture.detectChanges();

    expect(handleSelectedRowSpy).toHaveBeenCalled();
    expect(selectedProductSpy).toHaveBeenCalled();
    });

});
