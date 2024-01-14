import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ProductFilterComponent } from './product-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../../../shared/services/product/product.service';
import { of } from 'rxjs';
import { MatSelect } from '@angular/material/select';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;
  let service: ProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductFilterComponent,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ProductFilterComponent,
          useValue: { categoriesList: ['Category 1', 'Category 2'] },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductFilterComponent);
    service = fixture.debugElement.injector.get(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of categories from the service', () => {
    const mockCategories = ['Category 1', 'Category 2'];
    const getCategoiesSpy = spyOn(service, 'getCategories').and.returnValue(
      of(mockCategories)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(getCategoiesSpy).toHaveBeenCalled();
      expect(component.categoriesList()?.length).toBe(2);
    });
  });

  it('should emit filterSelected event when a category is selected', () => {
    const selectionChangeCategorySpy = spyOn(
      component,
      'selectionChangeCategory'
    ).and.callThrough();
    const filterSelectedSpy = spyOn(component.filterSelected, 'emit');
    fixture.detectChanges();
    const componentchild = fixture.debugElement.query(By.directive(MatSelect));
    componentchild.componentInstance.selectionChange.emit({
      source: null,
      value: 'category 1',
    });

    expect(selectionChangeCategorySpy).toHaveBeenCalled();
    expect(filterSelectedSpy).toHaveBeenCalledWith({
      category: 'category 1',
      limit: 5,
    });
  });

  it('should emit filterSelected event when a limit is selected', () => {
    const selectionChangeLimitSpy = spyOn(
      component,
      'selectionChangeLimit'
    ).and.callThrough();
    const filterSelectedSpy = spyOn(component.filterSelected, 'emit');
    fixture.detectChanges();
    const selector = fixture.debugElement.query(
      By.css('[data-testid="limit-selected"]')
    );

    selector.componentInstance.selectionChange.emit({
      source: null,
      value: 10,
    });

    expect(selectionChangeLimitSpy).toHaveBeenCalled();
    expect(filterSelectedSpy).toHaveBeenCalledWith({
      category: 'all',
      limit: 10,
    });
  });
});
