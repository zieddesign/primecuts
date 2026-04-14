import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { OrderService, OrderItem } from '../../shared/services/order.service';
import { AdvisorService } from '../../shared/services/advisor.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterModule, TranslateModule, HeaderComponent],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {

  orderItems: OrderItem[] = [];
  customerName: string = '';
  constructor(
    private router: Router,
    private orderService: OrderService,
    public advisorService: AdvisorService
  ) { }

  ngOnInit(): void {
    this.orderItems = this.orderService.getItems();
    this.orderService.clientName$.subscribe(name => {
      this.customerName = name;
    });
  }

  get totalPrice(): number {
    return this.orderItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  get totalFormatted(): string {
    return this.orderService.getTotalFormatted();
  }

  getDetailLine(item: OrderItem): string {
    const parts: string[] = [];
    if (item.subOption) parts.push(item.subOption.toUpperCase());
    if (item.quantity) parts.push(item.quantity + ' PCS');
    if (item.weight) parts.push(item.weight + ' Kg');
    return parts.join(', ');
  }

  editItem(index: number): void {
    const item = this.orderItems[index];
    if (item.subOption) {
      this.router.navigate([
        '/quantity-price', item.meat, item.cut, item.cutType, item.subOption,
      ]);
    } else {
      this.router.navigate([
        '/quantity-price', item.meat, item.cut, item.cutType,
      ]);
    }
  }

  deleteItem(index: number): void {
    this.orderService.removeItem(index);
    this.orderItems = this.orderService.getItems();
  }

  onPrev(): void {
    this.router.navigate(['/another-cut']);
  }

  cancelAll(): void {
    this.orderService.clearOrder();
    this.router.navigate(['/meat-choice']);
  }

  printTicket(): void {
    window.print();
  }

  trackByItem(_: number, item: OrderItem): string {
    return item.meat + item.cut + item.cutType + item.subOption;
  }


}