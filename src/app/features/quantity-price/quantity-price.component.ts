import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-quantity-price',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, FormsModule, TranslateModule, HeaderComponent],
  templateUrl: './quantity-price.component.html',
  styleUrl: './quantity-price.component.scss',
})
export class QuantityPriceComponent {

  meatType    = 'beef';
  selectedPart = 'entrecote';
  cutType     = 'cube';
  size        = '';          

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

  quantity        = 2;
  estimatedWeight = '';
  estimatedPrice  = '';

constructor(
  private router: Router,
  private route: ActivatedRoute
) {
  this.meatType     = this.route.snapshot.paramMap.get('type')    || 'beef';
  this.selectedPart = this.route.snapshot.paramMap.get('part')    || 'entrecote';
  this.cutType      = this.route.snapshot.paramMap.get('cutType') || 'cube';
  this.size         = this.route.snapshot.paramMap.get('size')    || '';

  this.route.queryParamMap.subscribe(params => {
    const options = params.get('options');
    if (options) {
      console.log('Options haché reçues:', options.split(','));
    }
  });

  this.cuts = this.cuts.map(c => ({
    ...c,
    selected: c.code === this.cutType
  }));
}


  selectCut(code: string): void {
    this.cuts = this.cuts.map(c => ({ ...c, selected: c.code === code }));
    this.cutType = code;
  }

  goBack(): void {
    this.router.navigate(['/cut-type', this.meatType, this.selectedPart]);
  }

  goNext(): void {
    if (this.size) {
      // Coupe AVEC taille — ex: /emballage/beef/entrecote/cube/c2/2
      this.router.navigate([
        '/emballage',
        this.meatType,
        this.selectedPart,
        this.cutType,
        this.size,
        this.quantity,
      ]);
    } else {
      // Coupe SANS taille — ex: /emballage/beef/entrecote/hache/2
      this.router.navigate([
        '/emballage',
        this.meatType,
        this.selectedPart,
        this.cutType,
        this.quantity,
      ]);
    }
  }

  getMeatKey(): string {
    return 'MEAT.' + this.meatType.toUpperCase();
  }

  getPartKey(): string {
    return 'CUTS.' + this.selectedPart.toUpperCase();
  }
}