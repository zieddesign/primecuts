import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OrderService, OrderItem } from '../../shared/services/order.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  @Input() clientNumber: string = '247';  
  @Input() cartCount: number = 0;          

  cartItems: OrderItem[] = [];
  showCart = false;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Initialisation du panier
    this.cartItems = this.orderService.getItems();
    this.cartCount = this.orderService.count;
  }

  goToLanguage(): void {
    this.router.navigate(['/language']);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

removeItem(index: number): void {
  this.orderService.removeItem(index);
  this.cartItems = this.orderService.getItems();
  this.cartCount = this.orderService.count;
}


goToBasket(): void {
  this.showCart = false;
  this.router.navigate(['/basket']);
}

}
