import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { sku: '', name: '', price: 0, images: [] };
  isEdit = false;
  imageFiles: File[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getProduct(id).subscribe(data => this.product = data);
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.imageFiles = Array.from(event.target.files);
    }
  }

  saveProduct() {
    const formData = new FormData();
    formData.append('sku', this.product.sku);
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    this.imageFiles.forEach(file => formData.append('images', file));
    if (this.isEdit && this.product.id) {
      this.productService.updateProduct(this.product.id, formData as any).subscribe(() => this.router.navigate(['/']));
    } else {
      this.productService.addProduct(formData as any).subscribe(() => this.router.navigate(['/']));
    }
  }
}
