import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OrderService, OrderItem } from '../../shared/services/order.service';
import { Subscription } from 'rxjs';
import { AdvisorService } from '../services/advisor.service';

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
  clientName: string = '';
  private subs = new Subscription();
  constructor(
    private router: Router,
    private orderService: OrderService,
    public advisorService: AdvisorService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.orderService.getItems();
    this.cartCount = this.orderService.count;

    this.subs.add(
      this.orderService.clientName$.subscribe(name => {
        this.clientName = name;
      })
    );
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
    this.refreshCart();

    const savedName = localStorage.getItem('pc_user');
    if (savedName) {
      this.clientName = savedName;
    }
  }
  refreshCart(): void {
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
  isDarkMode = false;
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  private enableDarkMode(): void {
    this.isDarkMode = true;
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }

  private disableDarkMode(): void {
    this.isDarkMode = false;
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }

}
