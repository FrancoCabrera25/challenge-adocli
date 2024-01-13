import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../shared/interface/product.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  @Input() productList: Product[] = [];
  @Output() selectedProduct = new EventEmitter<Product>();
  displayedColumns: string[] = ['id', 'title', 'category', 'price'];
  selectedRow?: Product;

  handleSelectedRow(row: Product): void {
    this.selectedRow = row;
    this.selectedProduct.emit(row);
  }
}
