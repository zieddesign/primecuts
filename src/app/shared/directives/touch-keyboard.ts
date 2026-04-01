import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[touchKeyboard]',
  standalone: true,
})
export class TouchKeyboardDirective {
  @Input() keyboardType: 'numeric' | 'text' = 'text';

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    const el = event.target as HTMLInputElement;
    el.setAttribute('inputmode', this.keyboardType === 'numeric' ? 'decimal' : 'text');
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('autocapitalize', 'off');
  }
}