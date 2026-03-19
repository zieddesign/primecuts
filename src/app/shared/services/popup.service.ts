import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs'; 

@Injectable({ providedIn: 'root' })
export class PopupService {
  private popupSubject = new ReplaySubject<boolean>(1);
  showPopup$ = this.popupSubject.asObservable();

  triggerPopup() {
    this.popupSubject.next(true);
  }

  closePopup() {
    this.popupSubject.next(false);
  }
}