import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { OrderService, OrderItem } from '../../shared/services/order.service';

@Component({
  selector: 'app-another-cut',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './another-cut.component.html',
  styleUrls: ['./another-cut.component.scss'],
})
export class AnotherCutComponent implements OnInit {
  orderItems: OrderItem[] = [];
  totalEstimate: string = '--';
  customerName: string = ''
  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderItems = this.orderService.getItems();
     this.orderService.clientName$.subscribe(name => {
      this.customerName = name;
    });
  }

  addAnotherCut(): void {
    this.router.navigate(['/meat-choice']);
  }

  finishAndGoToBasket(): void {
    this.router.navigate(['/basket']);
  }

  removeItem(index: number): void {
    this.orderService.removeItem(index);
    this.orderItems = this.orderService.getItems();
  }

  cancelAll(): void {
    this.orderService.clearOrder();
    this.router.navigate(['/meat-choice']);
  }

  cancelCutGoBasket(): void {
    const items = this.orderService.getItems();
    if (items.length > 0) {
      this.orderService.removeItem(items.length - 1);
    }
    this.router.navigate(['/basket']);
  }
}