import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gaming ASUS ROG',
      price: 25000000,
      description: 'Laptop gaming dengan processor Intel Core i9 dan RTX 4080',
      imageUrl: 'https://via.placeholder.com/300x200/00897B/FFFFFF?text=Laptop',
      category: 'Electronics',
      inStock: true,
      rating: 5
    },
    {
      id: 2,
      name: 'Mouse Wireless Logitech',
      price: 450000,
      description: 'Mouse wireless ergonomis dengan battery tahan lama',
      imageUrl: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Mouse',
      category: 'Accessories',
      inStock: true,
      rating: 4
    }
  ];

  showDescriptions = true;
  cardStyle = 'default';

  selectedProduct: Product | null = null;
  cartItems: Product[] = [];
  eventLog: string[] = [];

  toggleDescriptions(): void {
    this.showDescriptions = !this.showDescriptions;
  }

  changeStyle(style: string): void {
    this.cardStyle = style;
  }

  handleProductSelected(product: Product): void {
    this.selectedProduct = product;
    this.addToEventLog(`Product selected: ${product.name}`);
  }

  handleAddToCart(product: Product): void {

    const existingItem =
      this.cartItems.find(item => item.id === product.id);

    if (!existingItem) {

      this.cartItems.push(product);

      this.addToEventLog(
        `Added to cart: ${product.name}`
      );
    }
  }

  handleViewDetails(productId: number): void {

    const product =
      this.products.find(p => p.id === productId);

    if (product) {

      alert(
        `Nama: ${product.name}
Harga: Rp ${product.price.toLocaleString('id-ID')}`
      );

      this.addToEventLog(
        `View details: ${product.name}`
      );
    }
  }

  addToEventLog(message: string): void {

    const timestamp =
      new Date().toLocaleTimeString();

    this.eventLog.unshift(
      `[${timestamp}] ${message}`
    );
  }

}