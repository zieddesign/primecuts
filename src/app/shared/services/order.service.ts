import { Injectable } from '@angular/core';

export interface OrderItem {
  meat:      string;   // ex: 'BEEF'
  cut:       string;   // ex: 'Entrecôte'
  cutType:   string;   // ex: 'Tranche S2'
  subOption: string;   // ex: 'S2'
  quantity:  number;
  weight:    number;
  price:     number;
  packaging: string;   // ex: 'Carton'
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private items: OrderItem[] = [];
  clientName: string = '';

  getItems(): OrderItem[] { return [...this.items]; }
  addItem(item: OrderItem): void { this.items.push(item); }
  removeItem(index: number): void { this.items.splice(index, 1); }
  clearOrder(): void { this.items = []; }
  get count(): number { return this.items.length; }
}
