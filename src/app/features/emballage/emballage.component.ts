import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../shared/header/header';
import { OrderService } from '../../shared/services/order.service';

export interface PackagingOption {
  id: string;
  nameKey: string;
  nameArKey: string;
  descKey: string;
  selected: boolean;
}

@Component({
  selector: 'app-emballage',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, HeaderComponent],
  templateUrl: './emballage.component.html',
  styleUrls: ['./emballage.component.scss'],
})
export class EmballageComponent implements OnInit {

  // ── Params route ──────────────────────────────────────────
  meatType = '';
  part     = '';
  cutType  = '';
  size     = '';       // subOption ex: 'c2', 's2'
  quantity = 1;

  cartCount = signal<number>(0);

  packagingOptions = signal<PackagingOption[]>([
    {
      id: 'carton',
      nameKey:   'EMBALLAGE.CARTON_NAME',
      nameArKey: 'EMBALLAGE.CARTON_NAME_AR',
      descKey:   'EMBALLAGE.CARTON_DESC',
      selected: true,
    },
    {
      id: 'sachet',
      nameKey:   'EMBALLAGE.SACHET_NAME',
      nameArKey: 'EMBALLAGE.SACHET_NAME_AR',
      descKey:   'EMBALLAGE.SACHET_DESC',
      selected: false,
    },
  ]);

  selectedPackaging = computed(
    () => this.packagingOptions().find(p => p.selected) ?? this.packagingOptions()[0]
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const p       = this.route.snapshot.params;
    this.meatType = p['type']      || '';
    this.part     = p['part']      || '';
    this.cutType  = p['cutType']   || '';
    this.size     = p['size']      || '';
    this.quantity = +p['quantity'] || 1;

    this.cartCount.set(this.orderService.count);
  }

  selectPackaging(id: string): void {
    this.packagingOptions.update(opts =>
      opts.map(o => ({ ...o, selected: o.id === id }))
    );
  }

  onPrev(): void {
    if (this.size) {
      this.router.navigate([
        '/quantity-price', this.meatType, this.part, this.cutType, this.size,
      ]);
    } else {
      this.router.navigate([
        '/quantity-price', this.meatType, this.part, this.cutType,
      ]);
    }
  }

  onConseil(): void {
    console.log('Show advice');
  }

  onAddToCart(): void {
    this.orderService.addItem({
      meat:      this.meatType,          
      cut:       this.part,              
      cutType:   this.cutType,           
      subOption: this.size,            
      quantity:  this.quantity,
      weight:    0,                      
      price:     0,                      
      packaging: this.selectedPackaging().id,  
    });

    this.cartCount.set(this.orderService.count);
    this.router.navigate(['/another-cut']);
  }

  trackByOption(_: number, opt: PackagingOption): string {
    return opt.id;
  }

  getMeatKey(): string { return 'MEAT.'     + this.meatType.toUpperCase(); }
  getPartKey(): string { return 'CUTS.'     + this.part.toUpperCase();     }
  getCutKey(): string  { return 'CUT_TYPE.' + this.cutType.toUpperCase();  }
}