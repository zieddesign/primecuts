import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { VirtualKeyboardComponent } from '../../shared/virtual-keyboard/virtual-keyboard';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-quantity-price',
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,
    TranslateModule,
    HeaderComponent,
    VirtualKeyboardComponent,   
  ],
  templateUrl: './quantity-price.component.html',
  styleUrl: './quantity-price.component.scss',
})
export class QuantityPriceComponent {

  meatType     = 'beef';
  selectedPart = 'entrecote';
  cutType      = 'cube';
  size         = '';

  meatTabs = [
    { code: 'beef',   label: 'MEAT.BEEF'   },
    { code: 'agneau', label: 'MEAT.AGNEAU' },
    { code: 'camel',  label: 'MEAT.CAMEL'  },
    { code: 'chevre', label: 'MEAT.CHEVRE' },
  ];

  cuts = [
    { code: 'cube',    label: 'CUBE',    sublabel: 'C2 — 3cm',  selected: true  },
    { code: 'tranche', label: 'TRANCHE', sublabel: 'S2 — 12mm', selected: false },
  ];

  // ── Valeurs saisies ───────────────────────────────────
  quantity        = 0;
  estimatedWeight = '';
  estimatedPrice  = '';

  // ── Clavier virtuel ───────────────────────────────────
  showKeyboard    = false;
  keyboardTarget: 'weight' | 'price' | 'quantity' = 'weight';
  customerName: string = ''
  // Valeur courante affichée dans le clavier
  get currentKeyboardValue(): string {
    if (this.keyboardTarget === 'quantity') return this.quantity > 0 ? String(this.quantity) : '';
    if (this.keyboardTarget === 'weight')   return this.estimatedWeight;
    if (this.keyboardTarget === 'price')    return this.estimatedPrice;
    return '';
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService 
  ) {
    this.meatType     = this.route.snapshot.paramMap.get('type')    || 'beef';
    this.selectedPart = this.route.snapshot.paramMap.get('part')    || 'entrecote';
    this.cutType      = this.route.snapshot.paramMap.get('cutType') || 'cube';
    this.size         = this.route.snapshot.paramMap.get('size')    || '';

    this.route.queryParamMap.subscribe(params => {
      const options = params.get('options');
      if (options) console.log('Options haché reçues:', options.split(','));
    });

    this.cuts = this.cuts.map(c => ({
      ...c,
      selected: c.code === this.cutType,
    }));
  }
ngOnInit(): void {
   this.orderService.clientName$.subscribe(name => {
      this.customerName = name;
    });
}
  // ── Keyboard handlers ─────────────────────────────────
  openKeyboard(target: 'weight' | 'price' | 'quantity'): void {
    this.keyboardTarget = target;
    this.showKeyboard   = true;
  }

  closeKeyboard(): void {
    this.showKeyboard = false;
  }

  onValueChange(val: string): void {
    switch (this.keyboardTarget) {
      case 'quantity': this.quantity        = parseInt(val)  || 0;  break;
      case 'weight':   this.estimatedWeight = val;                   break;
      case 'price':    this.estimatedPrice  = val;                   break;
    }
  }

  onConfirm(): void {
    this.showKeyboard = false;
  }

  // ── Actions ───────────────────────────────────────────
  selectCut(code: string): void {
    this.cuts    = this.cuts.map(c => ({ ...c, selected: c.code === code }));
    this.cutType = code;
  }

  goBack(): void {
    this.router.navigate(['/cut-type', this.meatType, this.selectedPart]);
  }



  getMeatKey(): string { return 'MEAT.' + this.meatType.toUpperCase();  }
  getPartKey(): string { return 'CUTS.' + this.selectedPart.toUpperCase(); }
get canGoNext(): boolean {
  return (this.quantity > 0) || !!this.estimatedWeight || !!this.estimatedPrice;
}
isSubmitting = false;

goNext(): void {
  if (this.isSubmitting) return; 

  const weightVal = parseFloat(this.estimatedWeight) || 0;
  const priceVal = parseFloat(this.estimatedPrice) || 0;

  if (this.quantity > 0 || weightVal > 0 || priceVal > 0) {
    this.isSubmitting = true;

    const item = {
      meat: this.meatType,
      cut: this.selectedPart,
      cutType: this.cutType,
      subOption: this.size,
      quantity: this.quantity,
      weight: weightVal,
      price: priceVal,
      packaging: ''
    };

    this.orderService.addItem(item);

    
    const base = ['/emballage', this.meatType, this.selectedPart, this.cutType];
    const targetRoute = this.size ? [...base, this.size, this.quantity] : [...base, this.quantity];
    
    this.router.navigate(targetRoute).then(() => {
      this.isSubmitting = false; 
    });
  }
}

}