import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../../shared/services/product/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  public selectedCategory = signal<string>('all');
  public selectedLimit = signal<number>(5);
  public categoriesList = toSignal<string[]>(
    this.productService.getCategories()
  );
  @Output() filterSelected = new EventEmitter<{
    category: string;
    limit: number;
  }>();

  @Output() filter = new EventEmitter<void>();

  public limitList: number[] = [10, 15, 20, 25];
  constructor(private productService: ProductService) {}

  selectionChangeCategory({ value }: MatSelectChange): void {
    this.selectedCategory.set(value);
    this.filterSelectedEmit();
  }

  selectionChangeLimit({ value }: MatSelectChange): void {
    this.selectedLimit.set(value);
    this.filterSelectedEmit();
  }
  private filterSelectedEmit(): void {
    this.filterSelected.emit({
      category: this.selectedCategory(),
      limit: this.selectedLimit(),
    });
  }
}
