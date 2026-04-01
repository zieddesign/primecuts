import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-keyboard.html',
  styleUrls: ['./virtual-keyboard.scss'],
})
export class VirtualKeyboardComponent {
  @Input() value = '';
  @Input() mode: 'text' | 'numeric' = 'text';
  @Output() valueChange = new EventEmitter<string>();
  @Output() confirmed = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  caps = false;

  // Configuration Texte (Sans touche '123' pour forcer le texte)
  readonly rowsTextOnly = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['⇧', 'w', 'x', 'c', 'v', 'b', 'n', '.', '-', '⌫'],
    ['espace', '✓'],
  ];

  // Configuration Numérique (Sans touche 'ABC' pour forcer les chiffres)
  readonly rowsNumOnly = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [',', '0', '⌫'],
    ['✓']
  ];

  // Configuration Mixte (Avec touches de bascule)
  readonly rowsTextMix = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['⇧', 'w', 'x', 'c', 'v', 'b', 'n', '123', '⌫'],
    ['espace', '✓'],
  ];

  readonly rowsNumMix = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['ABC', '0', '⌫'],
    ['✓']
  ];

  get rows() {
    if (this.mode === 'numeric') return this.rowsNumOnly;
    return this.rowsTextOnly;
    // Note: Pour le mode mixte, vous pouvez créer une logique 'this.isMix'
  }

  press(key: string): void {
    switch (key) {
      case '⌫':
        this.value = this.value.slice(0, -1);
        break;
      case '⇧':
        this.caps = !this.caps;
        return;
      case 'espace':
        this.value += ' ';
        break;
      case '✓':
        this.confirmed.emit(this.value);
        return;
      case '123':
        this.mode = 'numeric';
        return;
      case 'ABC':
        this.mode = 'text';
        return;
      default:
        if (this.mode === 'text') {
          this.value += this.caps ? key.toUpperCase() : key;
          if (this.caps) this.caps = false;
        } else {
          this.value += key;
        }
    }
    this.valueChange.emit(this.value);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent): void {
    e.preventDefault();
  }
}