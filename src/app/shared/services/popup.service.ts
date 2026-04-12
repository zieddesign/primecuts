import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class PopupService {
  private popupSubject = new ReplaySubject<boolean>(1);
  userName: string = '';
  showPopup$ = this.popupSubject.asObservable();
  constructor(
    private orderService: OrderService
  ) { }
  triggerPopup() {
    this.popupSubject.next(true);
  }

  closePopup() {
    this.popupSubject.next(false);
  }
  confirmName(name: string): void {
    const trimmed = name?.trim();
    if (trimmed) {
      this.orderService.setClientName(trimmed); 
    }
    this.closePopup();
  }
}