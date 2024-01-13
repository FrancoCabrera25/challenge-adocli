import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../../shared/services/product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent implements OnInit {
  public selectedCategory = 'all';
  public selectedLimit = 5;
  public categoriesList$: Observable<string[]> = new Observable<string[]>();

  @Output() filterSelected = new EventEmitter<{
    category: string;
    limit: number;
  }>();

  @Output() filter = new EventEmitter<void>();

  public limitList: number[] = [10, 15, 20, 25];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.categoriesList$ = this.productService.getCategories();
  }

  selectionChangeCategory({ value }: MatSelectChange): void {
    this.selectedCategory = value;
    this.filterSelectedEmit();
  }

  selectionChangeLimit({ value }: MatSelectChange): void {
    this.selectedLimit = value;
    this.filterSelectedEmit();
  }
  private filterSelectedEmit(): void {
    this.filterSelected.emit({
      category: this.selectedCategory,
      limit: this.selectedLimit,
    });
  }
}
