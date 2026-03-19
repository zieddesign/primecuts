import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  @Input() clientNumber: string = '247';
  @Input() cartCount: number = 0;

  showCart = false;

  cartItems = [
    { id: 1, cut: 'Cut 1', meat: 'Beef', price: 50 },
    { id: 2, cut: 'Cut 2', meat: 'Agneau', price: 75 }
  ];

  constructor(private router: Router) {}

  goToLanguage(): void {
    this.router.navigate(['/language']);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.cartCount = this.cartItems.length;
  }

  goToBasket(): void {
    this.showCart = false;
    this.router.navigate(['/basket']);
  }
}