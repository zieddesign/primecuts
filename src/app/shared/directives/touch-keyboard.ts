import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[touchKeyboard]',
  standalone: true,
})
export class TouchKeyboardDirective {
  @Input() keyboardType: 'numeric' | 'text' = 'text';
  @Input() keyboardLang: 'ar' | 'en' = 'en';

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    const el = event.target as HTMLInputElement;
    el.setAttribute('inputmode', this.keyboardType === 'numeric' ? 'decimal' : 'text');
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('autocapitalize', 'off');

    if (this.keyboardLang === 'ar') {
      el.setAttribute('lang', 'ar');
      el.setAttribute('dir', 'rtl');
    } else {
      el.setAttribute('lang', 'en');
      el.removeAttribute('dir');
    }
  }
}
