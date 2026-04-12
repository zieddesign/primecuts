import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    private clientNameSource = new BehaviorSubject<string>('');
    clientName$ = this.clientNameSource.asObservable();
    getItems(): OrderItem[] {
  return this.items.filter(i => i.quantity > 0 || i.weight > 0 || i.price > 0);
}

  addItem(item: Omit<OrderItem, 'id'>): void {
  // ✅ Ne rien ajouter si tout est vide
  if ((item.quantity ?? 0) <= 0 && (item.weight ?? 0) <= 0 && (item.price ?? 0) <= 0) {
    return;
  }

  const existing = this.items.find(i =>
    i.meat === item.meat &&
    i.cut === item.cut &&
    i.cutType === item.cutType &&
    i.subOption === item.subOption &&
    i.packaging === item.packaging
  );

  if (existing) {
    existing.quantity += item.quantity;
    existing.weight += item.weight;
    existing.price += item.price;
  } else {
    this.items.push({ ...item, id: this.nextId++ });
  }
}


    removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    clearOrder(): void { this.items = []; }

    get count(): number { return this.items.length; }
    setClientName(name: string): void {
        const trimmed = name?.trim();
        if (trimmed) {
            this.clientNameSource.next(trimmed);
        }
    }

    getClientName(): string {
        return this.clientNameSource.getValue();
    }
    getTotal(): number {
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    getTotalFormatted(): string {
        return this.getTotal().toFixed(2) + ' TND';
    }


}

