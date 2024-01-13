import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NgbActiveModal,  } from "@ng-bootstrap/ng-bootstrap";
import { Product } from "../../../../shared/interface/product.interface";
import { NgOptimizedImage } from '@angular/common'
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent  {
  constructor(
    public activeModal: NgbActiveModal
  ) { }
  public product!: Product;
}
