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

  // @Input untuk menerima data dari parent
  @Input() product!: Product;

  // @Input dengan default value
  @Input() showDescription = true;

  // @Input dengan alias
  @Input('cardStyle') customStyle = 'default';

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