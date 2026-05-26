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
      imageUrl: '/assets/leptop.webp',
      category: 'Electronics',
      inStock: true,
      rating: 5
    },
    {
      id: 2,
      name: 'Mouse Wireless Logitech',
      price: 450000,
      description: 'Mouse wireless ergonomis dengan battery tahan lama',
      imageUrl: '/assets/mouse.jpg',
      category: 'Accessories',
      inStock: true,
      rating: 4
    },
    { 
      id: 3, 
      name: 'Keyboard Mechanical', 
      price: 1200000, 
      description: 'Mechanical keyboard dengan RGB lighting', 
      imageUrl: '/assets/keyboard.jpg', 
      category: 'Accessories', 
      inStock: false, 
      rating: 5 
    }, 
    { 
      id: 4, 
      name: 'Monitor 4K LG', 
      price: 8500000, 
      description: 'Monitor 27 inch dengan resolusi 4K dan HDR', 
      imageUrl: '/assets/monitor.jpg', 
      category: 'Electronics', 
      inStock: true, 
      rating: 4 
    }
  ];

  showDescriptions = true;
  cardStyle = 'default';

  // TUGAS 1 state
  discountPercentage = 10;
  cardSize: 'small' | 'medium' | 'large' = 'medium';
  showRating = true;

  selectedProduct: Product | null = null;
  cartItems: Product[] = [];
  eventLog: string[] = [];

  // TUGAS 2 state
  totalLikes = 0;
  totalQuantity = 0;
  comparedProducts: Product[] = [];

  toggleDescriptions(): void {
    this.showDescriptions = !this.showDescriptions;
  }

  changeStyle(style: string): void {
    this.cardStyle = style;
  }

  changeSize(size: 'small' | 'medium' | 'large'): void {
    this.cardSize = size;
  }

  toggleRating(): void {
    this.showRating = !this.showRating;
  }

  handleProductLiked(product: Product): void {
    this.totalLikes++;
    this.addToEventLog(`Product liked: ${product.name} (Total: ${this.totalLikes})`);
  }

  handleQuantityChanged(event: {product: Product, quantity: number}): void {
    this.addToEventLog(`Quantity changed for ${event.product.name} to ${event.quantity}`);
    this.totalQuantity += event.quantity; 
  }

  handleProductCompared(product: Product): void {
    if (this.comparedProducts.length < 2 && !this.comparedProducts.find(p => p.id === product.id)) {
      this.comparedProducts.push(product);
      this.addToEventLog(`Added to comparison: ${product.name}`);
    } else if (this.comparedProducts.length >= 2) {
      this.addToEventLog(`Comparison full! Clear to add more.`);
    } else {
      this.addToEventLog(`Already comparing: ${product.name}`);
    }
  }

  clearComparison(): void {
    this.comparedProducts = [];
    this.addToEventLog(`Comparison cleared`);
  }

  handleProductSelected(product: Product): void {
    this.selectedProduct = product;
    this.addToEventLog(`Product selected: ${product.name}`);
  }

  handleAddToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (!existingItem) {
      this.cartItems.push(product);
      this.addToEventLog(`Added to cart: ${product.name}`);
    } else {
      this.addToEventLog(`Already in cart: ${product.name}`);
    }
  }

  handleViewDetails(productId: number): void {
    const product = this.products.find(p => p.id === productId);

    if (product) {
      this.addToEventLog(`View details: ${product.name} (ID: ${productId})`);
      alert(
        `Product Details\n\nName: ${product.name}\nPrice: Rp ${product.price.toLocaleString('id-ID')}\nCategory: ${product.category}\nRating: ${product.rating}/5`
      );
    }
  }

  addToEventLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);

    // Keep only last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }

  clearEventLog(): void {
    this.eventLog = [];
  }

  getTotalCartPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.addToEventLog(`Removed from cart: ${product.name}`);
  }
}
