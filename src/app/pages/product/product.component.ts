import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { Product } from '../../shared/interface/product.interface';
import { MatButtonModule } from '@angular/material/button'
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductFilterComponent, ProductTableComponent, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  public productList: Product[] = [];
  constructor(
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(category = 'all', limit = 5): void {
    this.productService.getProducts(category, limit).subscribe({
      next: (products) => {
        this.productList = products;
      },
    });
  }

  public handleChangeFilters({ category, limit }: any): void {
    this.loadProducts(category, limit);
  }

  public showDetail(product: Product) {
    this.productService.showModalDetail(product);
  }
}
