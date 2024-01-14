import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductDetailComponent } from '../../../pages/product/components/product-detail/product-detail.component';
import { Product } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   public baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  getProducts(category = 'all', limit = 5): Observable<any> {
    let url = '';
    let limitPart = `?limit=${limit}`;
    if (category !== 'all') {
      url = `${this.baseUrl}/category/${category}${limitPart}`;
    } else {
      url = `${this.baseUrl}${limitPart}`;
    }
    return this.http.get(url);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  showModalDetail(product: Product): NgbModalRef {
    const modalRef = this.modalService.open(ProductDetailComponent);
    modalRef.componentInstance.product = product;
    return modalRef;
  }
}
