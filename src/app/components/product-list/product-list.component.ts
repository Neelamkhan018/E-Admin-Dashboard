import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.filter(
        p => p && p.sku && p.name && p.price
      );
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}
