import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Output() productSelected = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<number>();
  
  // TUGAS 2 Outputs
  @Output() productLiked = new EventEmitter<Product>();
  @Output() quantityChanged = new EventEmitter<{product: Product, quantity: number}>();
  @Output() productCompared = new EventEmitter<Product>();

  // @Input untuk menerima data dari parent
  @Input() product!: Product;

  // @Input dengan default value
  @Input() showDescription = true;

  // @Input dengan alias
  @Input('cardStyle') customStyle = 'default';

  // TUGAS 1 Inputs
  @Input() discountPercentage: number = 0;
  @Input() cardSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() showRating: boolean = true;

  quantity: number = 1;

  get discountedPrice(): number {
    if (this.discountPercentage > 0) {
      return this.product.price - (this.product.price * (this.discountPercentage / 100));
    }
    return this.product.price;
  }

  onLike(): void {
    this.productLiked.emit(this.product);
  }

  increaseQuantity(): void {
    this.quantity++;
    this.quantityChanged.emit({ product: this.product, quantity: this.quantity });
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChanged.emit({ product: this.product, quantity: this.quantity });
    }
  }

  onCompare(): void {
    this.productCompared.emit(this.product);
  }

  onCardClick(): void {
  this.productSelected.emit(this.product);
}

onAddToCart(): void {
  if (this.product.inStock) {
    this.addToCart.emit(this.product);
  }
}

onViewDetails(): void {
  this.viewDetails.emit(this.product.id);
}

  // Method untuk format currency
  formatPrice(price: number): string {
    return 'Rp ' + price.toLocaleString('id-ID');
  }

  // Method untuk generate star rating
  getStars(rating: number): string[] {
    const stars: string[] = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }

    return stars;
  }
}