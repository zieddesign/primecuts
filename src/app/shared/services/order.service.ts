import { Injectable } from '@angular/core';

export interface OrderItem {
  id: number;       
  meat: string;
  cut: string;
  cutType: string;
  subOption: string;
  quantity: number;
  weight: number;
  price: number;
  packaging: string;
}


@Injectable({ providedIn: 'root' })
export class OrderService {
  private items: OrderItem[] = [];
  private nextId = 1;

  getItems(): OrderItem[] { return [...this.items]; }

  addItem(item: Omit<OrderItem, 'id'>): void {
    this.items.push({ ...item, id: this.nextId++ });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  clearOrder(): void { this.items = []; }

  get count(): number { return this.items.length; }
}
